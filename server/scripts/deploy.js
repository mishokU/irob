// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");

module.exports = deployTestContract

const networkName = "localganache"

const networkConfig = {
    url: "HTTP://127.0.0.1:7545",
    accounts: [`0x49553634723498641e25e2a077eb5db3c6e3df0e50f84641bcd96d2480128c0e`]
}

const provider = lazyObject(() => {
    return createProvider(
        networkName,
        networkConfig,
        hre.config.paths,
        hre.artifacts
    );
});

async function deployTestContract(listRequirements, sellerAddress) {
    try {

        hre.network = {
            name: networkName,
            config: networkConfig,
            provider,
        };

        const Requirements = await hre.ethers.getContractFactory("Requirements");
        const requirements = await Requirements.deploy(sellerAddress);
        await requirements.deployed();
        for (const requirement of listRequirements) {
            //const data = await requirements.addRequirement(requirement.type, requirement.value);
            //console.log("data cost: " + data.toString())
        }
        return hre.ethers.utils.formatEther(requirements.deployTransaction.gasLimit * 1000000000);
    } catch (e) {
        console.log(e)
        return 0;
    }
}

async function deployContract() {

}