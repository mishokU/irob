const hre = require("../../scripts/config")

module.exports = {
    getGasCostFromApi,
    getAccountTransactions
}

async function getAccountTransactions(account, networkId) {
    try {

        const key = process.env.ETHERSCAN_API_KEY;

        let baseUrl = ""
        if(networkId === 1){
            baseUrl = "https://api.etherscan.io/api"
        } else if(networkId === 11155111) {
            baseUrl = "https://api-sepolia.etherscan.io/api"
        } else {
            return []
        }

        const result = await fetch(`${baseUrl}?module=account&action=txlist&address=${account}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${key}`)

        const data = await result.json();

        return data.result

    } catch (e) {
        console.log("Get account transactions error: " + e.message)
    }
}

async function getGasCostFromApi() {
    try {
        const key = process.env.ETHERSCAN_API_KEY;
        const result = await fetch(`https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${key}`);
        const data = await result.json();
        const wei = Number(data.result.suggestBaseFee * 1000000000)
        return hre.ethers.utils.formatEther(wei)
    } catch (e) {
        console.log("getGasCostFromApi: " + e.message)
        return 0;
    }
}