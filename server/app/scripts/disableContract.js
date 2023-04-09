
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

    const result = await contract.sendDeposit(0);

    console.log("result")
    console.log(result)

}