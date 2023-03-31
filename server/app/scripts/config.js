const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const hre = require("hardhat");

const networkName = "localhost"

const networkConfig = {
    url: process.env.PROVIDER_KEY,
    accounts: [`0x22aabb811efca4e6f4748bd18a46b502fa85549df9fa07da649c0a148d7d5530`]
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