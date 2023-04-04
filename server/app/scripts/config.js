const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const hre = require("hardhat");

/*
    In local ganache
    1) first private key is account key - only for testing!
    2) second private key is deposit key - only for testing!
    3) third test metamask first SITE account - only for testing!
    4) fourth test metamask second SITE account - only for testing!
*/

const networkName = "ganache"

const networkConfig = {
    url: process.env.GANACHE_LOCAL_URL,
    accounts: [process.env.TEST_PRIVATE_KEY]
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