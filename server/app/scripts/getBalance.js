const hre = require("./config")
const ethers = require("ethers")

module.exports = getBalance

/*
    If dev stage call local ganache client balance
    If prod get real eth account from main net
*/

async function getBalance(userAccount, config) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(config.network_url);
        const balance = await provider.getBalance(userAccount)

        let convertedBalance = 0

        if(config.chain_id !== 1){
            convertedBalance = hre.ethers.utils.formatEther(
                await provider.getBalance(userAccount)
            )
        } else {
            convertedBalance = parseInt(balance._hex, 16)
        }

        console.log(convertedBalance)
        console.log(balance)

        return Number(convertedBalance)
    } catch (e) {
        console.log("Get balance error: " + e.message)
    }
}