const {Router} = require("express");

const licensesController = require("../../controllers/LicensesController")

const externalRouter = new Router()

module.exports = externalRouter

externalRouter.post('/update', (request, result) => {
    return updateLicenceCounter(request, result)
})

externalRouter.get('/getVideoUrl', (request, result) => {
    return updateLicenceCounter(request, result)
})



async function updateLicenceCounter(request, result) {
    try {

        const {licenseKey, type} = request.body

        if (licenseKey === undefined || type === undefined) {
            result.status(400).json({
                success: false,
                message: "License or type or licenseKey is undefined"
            })
        } else {

            const message = await licensesController.updateLicenseRequirement(licenseKey, type)

            if (message !== undefined) {
                result.status(400).json({
                    success: false,
                    message: message
                })
            } else {
                result.status(200).json({
                    success: true,
                    message: `Requirement with type: ${type} was increased!`
                })
            }
        }

    } catch (e) {
        const message = "Error in updating license counter: " + e.message
        console.log(message)
        result.json(500).json({
            success: false,
            message: message
        })
    }
}