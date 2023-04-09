const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const hre = require("./config");

module.exports = setupHreEnvironment

function setupHreEnvironment() {

    const networkName = "ganache"

    const networkConfig = {
        url: process.env.GANACHE_LOCAL_URL,
        accounts: [process.env.DEPOSIT_PRIVATE_KEY]
    }

    const provider = lazyObject(() => {
        return createProvider(
            networkName,
            networkConfig,
            hre.config.paths,
            hre.artifacts
        );
    });

    return {
        name: networkName,
        config: networkConfig,
        provider,
    }
}