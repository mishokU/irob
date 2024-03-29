const {Router} = require("express");

const roomRequirementsController = require("../../controllers/RoomRequirementsController")
const smartContractDeployment = require("../../scripts/deploy");
const userController = require("../../controllers/UserController");
const licensesController = require("../../controllers/LicensesController")
const roomResultController = require("../../controllers/RoomResultController")
const roomController = require("../../controllers/RoomControllers")
const contentController = require("../../controllers/ContentController")

const etherscan = require("../../services/etherscan/etherscanApi")

const Web3 = require("web3");
const {getToken} = require("../../controllers/Utils");

const roomPaymentRouter = new Router()

module.exports = roomPaymentRouter

roomPaymentRouter.get('/cost', (request, result) => {
    return getRoomRequirementsCost(request, result)
})

roomPaymentRouter.get('/result', (request, result) => {
    return getRoomResult(request, result)
})

roomPaymentRouter.post('/create', (request, result) => {
    return createSmartContract(request, result)
})

roomPaymentRouter.get('/contractData', (request, result) => {
    return getContractData(request, result)
})

async function getContractData(request, result) {
    try {

        const token = getToken(request)

        const ownerId = request.query.ownerId
        const userId = request.query.userId
        const roomId = request.query.roomId

        const data = await resolveBuyerAndSeller(token, ownerId, userId)

        const {depositCost, contractCost} = await getCosts(roomId)

        const contractData = await smartContractDeployment.getContractData(data.seller.account, data.buyer.account, depositCost)

        result.status(200).json({
            success: true,
            buyerAddress: data.buyer.account,
            sellerAddress: data.seller.account,
            commissionAddress: process.env.COMMISSION_ADDRESS,
            contractCost: contractCost,
            data: contractData
        })

    } catch (e) {
        const message = "Error in getting contract data: " + e.message
        console.log(message)
        result.status(200).json({
            success: false,
            message: message
        })
    }
}

async function getRoomResult(request, result) {
    try {

        const roomId = request.query.roomId

        const roomResult = await roomResultController.getRoomResult(roomId)

        if (roomResult !== undefined) {

            const license = await licensesController.getLicenseByRoomId(roomId)

            const commissionCost = calculateCommissionCost(
                roomResult.requirements,
                roomResult.gas,
                roomResult.deposit,
                roomResult.cost
            )

            const total = calculateTotalCost(roomResult.requirements, roomResult.gas, roomResult.deposit, commissionCost, roomResult.cost)

            let status
            if (license === undefined) {
                status = "canceled"
            } else {
                status = license.status
            }

            result.status(200).json({
                success: true,
                licenseStatus: status,
                roomPrices: {
                    requirementsCost: roomResult.requirements,
                    contractCost: roomResult.cost,
                    gasCost: roomResult.gas,
                    depositCost: roomResult.deposit,
                    commissionCost: commissionCost,
                    total: total
                }
            })
        } else {
            result.status(200).json({
                success: true,
                roomPrices: null
            })
        }
    } catch (e) {
        console.log("Error in getting room result: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error in get room result: " + e.message
        })
    }
}

async function getRoomRequirementsCost(request, result) {
    try {

        const token = getToken(request)

        const roomId = request.query.roomId
        const secondSideUserId = request.query.userId
        if (roomId !== undefined) {

            const {
                requirementsCost,
                depositCost,
                gasCost,
                commissionCost,
                contractCost
            } = await getCosts(roomId)

            if (requirementsCost === 0 || depositCost === 0 || gasCost === 0 || commissionCost === 0) {
                result.status(400).json({
                    success: false,
                    message: "Requirements or deposit cost or gas cost is zero"
                })
            } else {

                const secondAccount = await userController.getAccount(secondSideUserId)

                const room = await roomController.getRoom(roomId)

                const canPay = await roomController.checkOnBuyer(room.content_id, token)

                const total = calculateTotalCost(requirementsCost, gasCost, depositCost, commissionCost, contractCost)

                result.status(200).json({
                    success: true,
                    secondAccount: secondAccount,
                    canPay: canPay,
                    roomPrices: {
                        gasCost: gasCost,
                        contractCost: contractCost,
                        depositCost: depositCost,
                        commissionCost: commissionCost,
                        total: total
                    }
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

/*
    Call bash script that compile and run solidity contracts
    The end of current process will be final price of contract cost
*/

async function getRequirementsCostFromTestNet(requirements, depositCost) {
    try {
        const testAddress = process.env.TEST_ADDRESS
        const price = await smartContractDeployment.deployTestContract(requirements, testAddress, depositCost)
        return Number(price).toFixed(3)
    } catch (e) {
        console.log("getRequirementsCostFromTestNet: " + e.message)
    }
}

/*
    So first step is calculate smart contract price
    Send whole price to deposit ledger and create a smart contract from deposit ledger
    Or push contract from buyer and buyer create this contract with deposit cost
    This deposit cost send to deposit ledger on another account
 */

async function createSmartContract(request, result) {
    try {

        const token = getToken(request)
        const {ownerId, userId, roomId, contractAddress} = request.body

        const roomResult = await roomResultController.getRoomResult(roomId)

        if (roomResult !== undefined) {
            throw Error("Contract already created!")
        }

        const data = await resolveBuyerAndSeller(token, ownerId, userId)

        if (data.buyer.account !== data.seller.account) {

            const {
                requirementsCost,
                depositCost,
                contractCost,
                gasCost
            } = await getCosts(roomId)

            const checkSummedAddress = Web3.utils.toChecksumAddress(contractAddress)

            const room = await roomController.getRoom(roomId)

            /*
                Need to create video clone in shared folder in firebase.
            */

            const licenseId = await duplicateVideoFile(roomId, data.buyer.id, checkSummedAddress, room.content_id)

            await roomRequirementsController.updateRequirements(licenseId, roomId)
            await roomResultController.createRoomResult(roomId, requirementsCost, gasCost, depositCost, data.buyer.id, contractCost)

            result.status(200).json({
                success: true,
                title: "Congratulations with your deal!",
                description: "Now you can check your license at the profile page"
            })

        } else {
            result.status(400).json({
                success: false,
                message: "Error buyer and seller addresses can not be equal"
            })
        }
    } catch (e) {
        const message = "Error in creating smart contract: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getCosts(roomId) {
    try {

        const requirements = await roomRequirementsController.getRoomRequirements(roomId)

        let requirementsCost = 0
        let gasCost = 0
        let depositCost = 0
        let commissionCost = 0
        let contractCost = 0

        /*
            If requirement applied by second side
        */
        requirements.forEach((requirement) => {
            if (requirement.isAlive === false) {
                if (requirement.type === "Hold deposit") {
                    depositCost = Number(requirement.value)
                } else if (requirement.type === "Cost") {
                    contractCost = Number(requirement.value)
                } else {
                    requirementsCost += requirement.value
                }
            }
        })

        gasCost = await etherscan.getGasCostFromApi()
        console.log(gasCost)
        requirementsCost = await getRequirementsCostFromTestNet(requirements, depositCost)

        commissionCost = calculateCommissionCost(requirementsCost, gasCost, depositCost, contractCost)

        return {
            requirementsCost: requirementsCost,
            gasCost: Number(gasCost).toFixed(9),
            commissionCost: commissionCost,
            depositCost: depositCost,
            contractCost: contractCost,
            requirements: requirements
        }

    } catch (e) {
        console.log("Error in getting room cost: " + e.message)
    }
}

async function resolveBuyerAndSeller(token, ownerId, userId) {

    const user = await userController.getUser(token)
    const ownerUser = await userController.getUserById(ownerId)
    const secondUser = await userController.getUserById(userId)

    let buyer
    let seller

    if (user.id === ownerUser.id) {
        buyer = user
        seller = secondUser
    } else if (user.id === secondUser.id) {
        buyer = secondUser
        seller = user
    }

    return {
        buyer,
        seller
    }
}

async function duplicateVideoFile(roomId, userId, address, contentId) {

    const content = contentController.getContentById(contentId)

    const licenseId = await licensesController.createLicense(
        roomId,
        userId,
        address,
        contentId
    )

    return licenseId

}

function calculateCommissionCost(requirementsCost, gasCost, depositCost, contractCost) {
    return ((Number(requirementsCost) + Number(gasCost) + Number(contractCost) + Number(depositCost / 10)) * 0.05).toFixed(4)
}

function calculateTotalCost(requirementsCost, gasCost, depositCost, commissionCost, contractCost) {
    return (Number(requirementsCost) + Number(gasCost) + Number(depositCost) + Number(commissionCost) + Number(contractCost)).toFixed(3)
}