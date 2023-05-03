const {Router} = require("express");

const configController = require("../../controllers/ConfigController");
const configRouter = new Router()

// export our router to be mounted by the parent application
module.exports = configRouter

configRouter.post('/updateConfig', (request, result) => {
    return updateConfig(request, result)
})

configRouter.get('/getConfig', (request, result) => {
    return getConfig(request, result)
})

async function getConfig(request, result) {
    try {

        const networks = await configController.getConfig()

        result.status(200).json({
            success: true,
            networks: networks.map((network) => {
                return {
                    id: network.id,
                    networkUrl: network.network_url,
                    chainId: network.chain_id,
                    networkHex: network.chain_hex,
                    isEnabled: network.enabled,
                    name: network.name
                }
            })
        })

    } catch (e) {
        const message = "Error in get config: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateConfig(request, result) {
    try {

        const {id} = request.body

        if (id !== undefined) {
            const data = await configController.updateConfig(id)
            result.status(200).json({
                success: true,
                network: {
                    networkUrl: data.network_url,
                    chainId: data.chain_id,
                    networkHex: data.chain_hex,
                }
            })
        } else {
            result.status(400).json({
                success: false

            })
        }

    } catch (e) {
        const message = "Error in update config: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}