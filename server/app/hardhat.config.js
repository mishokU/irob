require("@nomicfoundation/hardhat-toolbox");
require('hardhat-deploy');
require("dotenv").config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    settings: {
        viaIR: true,
    },
    networks: {
        localganache: {
            url: "HTTP://127.0.0.1:7545",
            accounts: [`0x49553634723498641e25e2a077eb5db3c6e3df0e50f84641bcd96d2480128c0e`]
        }
    }
};