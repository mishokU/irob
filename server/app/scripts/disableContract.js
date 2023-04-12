
const hre = require("hardhat");
const setupHreEnvironment = require("./changeHreEnv");

module.exports = {
    disableContract
}

async function disableContract(address) {

    hre.network = setupHreEnvironment();

    const [owner] = await hre.ethers.getSigners()

    console.log(owner)
    console.log(address)

    const DepositHolder = await hre.ethers.getContractFactory("DepositHolder");
    const contract = await DepositHolder.attach(address);

    const result = await contract.getDepositCost()

    const buyer = await contract.getBuyerAddress()
    const seller = await contract.getSellerAddress()
    const deposit = await contract.getDepositAddress()

    console.log("buyer: " + buyer)
    console.log("seller: " + seller)
    console.log("deposit: " + deposit)

    console.log("cost: " + result)
    const resultSendDeposit = await contract.sendDeposit(0);

    console.log("result")
    console.log(await resultSendDeposit.wait())

}