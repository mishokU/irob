const {lazyObject} = require("hardhat/plugins");
const {createProvider} = require("hardhat/internal/core/providers/construction");
const hre = require("hardhat");

const networkName = "localganache"

const networkConfig = {
    url: "HTTP://127.0.0.1:7545",
    accounts: [`0x73698c7028d9c8c184ad04f9dcd27e28faba6f23180e268e7da72a2b20c6e90f`]
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