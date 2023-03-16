const {Router} = require("express");

const licensesController = require("../../controllers/LicensesController")

const Promise = require("bluebird");

const licensesRouter = new Router()

// export our router to be mounted by the parent application
module.exports = licensesRouter

licensesRouter.get('/getAll', (request, result) => {
    return getAllLicenses(request, result)
})

licensesRouter.delete('/delete', (request, result) => {
    return deleteLicense(request, result)
})

licensesRouter.post('/cancel', (request, result) => {
    return cancelLicense(request, result)
})

async function cancelLicense(request, result) {
    try {
        const licenseId = request.query.licenseId
        if(licenseId !== undefined){
            await licensesController.cancelLicense(licenseId)
            result.status(200).json({
                success: true,
                licenseId: licenseId
            })
        }
    } catch(e){
        console.log("Error while cancel license: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error while cancel license: " + e.message
        })
    }
}

async function deleteLicense(request, result) {
    try {
        const licenseId = request.query.licenseId
        if(licenseId !== undefined){
            await licensesController.deleteLicense(licenseId)
            result.status(200).json({
                success: true,
                licenseId: licenseId
            })
        }
    } catch(e){
        console.log("Error while delete license: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error while delete license: " + e.message
        })
    }
}

async function getAllLicenses(request, result) {
    try {
        const token = request.get('token')

        const licenses = licensesController.getLicenses(token)
        const licenseModels = await Promise.map(licenses, async (license) => {
            const requirementsProgress = await licensesController.getLicenseRequirementsProgress(license.id)
            return {
                id: license.id,
                status: license.status,
                name: license.name,
                owner: license.owner,
                date: license.date,
                isFavourite: license.isFavourite,
                uid: license.uid,
                progress: requirementsProgress
            }
        })

        result.status(200).json({
            success: true,
            licenses: licenseModels
        })
    } catch (e){
        console.log("Error in getting licenses: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error in getting licenses: " + e.message
        })
    }
}