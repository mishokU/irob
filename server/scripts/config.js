const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const hre = require("hardhat");

const networkName = process.env.PROVIDER_NAME

const networkConfig = {
    url: process.env.PROVIDER_KEY,
    accounts: [`0x6a630fe799e57d45ff2c5e582ed225e6fb7a701ea5c38f40260c5e60ef36d6aa`]
}

const provider = lazyObject(() => {
    return createProvider(
        networkName,
        networkConfig,
        hre.config.paths,
        hre.artifacts
    );
});

hre.network = {
    name: networkName,
    config: networkConfig,
    provider,
};

module.exports = hre