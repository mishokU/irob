const hre = require("./config")
const {hexlify, concat} = require("@ethersproject/bytes");
const Web3 = require("web3");

module.exports = {
    deployTestContract,
    getContractData
}

async function getContractData(sellerAddress, buyerAddress, depositCost) {

    const DepositHolder = await hre.ethers.getContractFactory("DepositHolder");

    const depositAddress = process.env.DEPOSIT_ADDRESS

    const seller = Web3.utils.toChecksumAddress(sellerAddress)
    const buyer = Web3.utils.toChecksumAddress(buyerAddress)
    const deposit = Web3.utils.toChecksumAddress(depositAddress)

    /*
        Need to convert depositCost from ether to wei
    */

    const depositCostInWei = Web3.utils.toWei(depositCost.toString(), 'ether');

    const args = [seller, buyer, deposit, depositCostInWei]

    return hexlify(concat([
        DepositHolder.bytecode,
        DepositHolder.interface.encodeDeploy(args)
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