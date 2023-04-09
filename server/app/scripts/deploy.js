const hre = require("./config")

const {hexlify, concat} = require("@ethersproject/bytes");

module.exports = {
    deployTestContract,
    getContractData
}

async function getContractData(sellerAddress, buyerAddress, depositCost) {

    const DepositHolder = await hre.ethers.getContractFactory("DepositHolder");

    const depositAddress = process.env.DEPOSIT_ADDRESS

    console.log("payment: seller: " + sellerAddress)
    console.log("payment: buyer: " + buyerAddress)
    console.log("payment: dep: " + depositAddress)

    return hexlify(concat([
        DepositHolder.bytecode,
        DepositHolder.interface.encodeDeploy([sellerAddress, buyerAddress, depositAddress, depositCost])
    ]));

}

async function deployTestContract(listRequirements, sellerAddress, depositCost) {
    try {

        const Lib = await hre.ethers.getContractFactory("StringUtils");
        const lib = await Lib.deploy();
        await lib.deployed();

        const Requirements = await hre.ethers.getContractFactory("RequirementsStorage", {
            libraries: {
                StringUtils: lib.address
            }
        });

        const requirements = await Requirements.deploy(sellerAddress, depositCost);
        await requirements.deployed();
        let fullEther = 0.0;

        for (const requirement of listRequirements) {
            const data = await requirements.addRequirement(requirement.type, requirement.value);
            fullEther += Number(hre.ethers.utils.formatEther(data.gasLimit * 1000000000))
        }

        fullEther += Number(hre.ethers.utils.formatEther(requirements.deployTransaction.gasLimit * 1000000000))

        return fullEther

    } catch (e) {
        console.log("Error in deployTestContract: " + e.message)
        return 0;
    }

}