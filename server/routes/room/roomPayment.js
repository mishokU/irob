const {Router} = require("express");
const roomRequirementsController = require("../../controllers/RoomRequirementsController")
const smartContractDeployment = require("../../scripts/deploy");

const roomPaymentRouter = new Router()

// export our router to be mounted by the parent application
module.exports = roomPaymentRouter

roomPaymentRouter.get('/cost', (request, result) => {
    return getRoomRequirementsCost(request, result)
})

roomPaymentRouter.post('/create', (request, result) => {
    return createSmartContract(request, result)
})

async function getRoomRequirementsCost(request, result) {
    try {
        const roomId = request.query.roomId
        if (roomId !== undefined) {
            const requirements = await roomRequirementsController.getRoomRequirements(roomId)

            let requirementsCost = 0
            let gasCost = 0
            let depositCost = 0
            let commissionCost = 0

            /*
                If requirement applied by second side
            */
            requirements.forEach((requirement) => {
                if (requirement.isAlive === false) {
                    if (requirement.type === "Hold deposit") {
                        depositCost = Number(requirement.value)
                    } else {
                        requirementsCost += requirement.value
                    }
                }
            })

            if (requirementsCost === 0 || depositCost === 0) {
                result.status(400).json({
                    success: false,
                    message: "Requirements or deposit cost is zero"
                })
            } else {

                gasCost = await getGasCostFromApi();
                requirementsCost = await getRequirementsCostFromTestNet(requirements)

                commissionCost = ((Number(requirementsCost) + Number(gasCost) + Number(depositCost / 10)) * 0.1).toFixed(4)
                const total = (Number(requirementsCost) + Number(gasCost) + Number(depositCost) + Number(commissionCost)).toFixed(1)

                result.status(200).json({
                    success: true,
                    requirementsCost: requirementsCost,
                    gasCost: gasCost,
                    depositCost: depositCost,
                    commissionCost: commissionCost,
                    total: total
                })
            }
        } else {
            result.status(400).json({
                success: false,
                message: "Error in getting room requirements cost: no roomId provided"
            })
        }
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in getting room requirements cost: " + e.message
        })
    }
}

async function getGasCostFromApi() {
    try {
        const key = 'H1N4HV9WRA87N6VS8DB51HZBMXCVWI6I32';
        const res = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${key}`);
        const data = await res.json();
        console.log(data.result)
        return Number(data.result.suggestBaseFee / 1000).toFixed(3);
    } catch (e) {
        console.log(e)
        return 0;
    }
}

/*
    Call bash script that compile and run solidity contracts
    The end of current process will be final price of contract cost
 */

async function getRequirementsCostFromTestNet(requirements) {
    try {
        const testAddress = "0x265346D6f42b517BC18E90C150caABdFD010107C"
        const price = await smartContractDeployment(requirements, testAddress)
        return Number(price).toFixed(3)
    } catch (e) {
        console.log(e)
    }
}

async function createSmartContract(request, result) {
    try {

    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error in creating smart contract: " + e.message
        })
    }
}