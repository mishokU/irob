const hre = require("./config")

async function getBalance(userAccount) {
    try {
        const provider = hre.ethers.provider;
        return Number(hre.ethers.utils.formatEther(
            await provider.getBalance(userAccount)
        ))
    } catch (e) {
        console.log("Get balance error: " + e.message)
    }
}

module.exports = getBalance