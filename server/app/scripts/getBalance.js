const hre = require("./config")
const ethers = require("ethers")

module.exports = getBalance

/*
    If dev stage call local ganache client balance
    If prod get real eth account from main net
*/

async function getBalance(userAccount) {
    try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.GANACHE_LOCAL_URL);
        return Number(hre.ethers.utils.formatEther(
            await provider.getBalance(userAccount)
        ))
    } catch (e) {
        console.log("Get balance error: " + e.message)
    }
}