const {Router} = require("express");

const licensesController = require("../../controllers/LicensesController")

const roomController = require("../../controllers/RoomControllers")

const Promise = require("bluebird");

const licensesRouter = new Router()

// export our router to be mounted by the parent application
module.exports = licensesRouter

licensesRouter.get('/getAll', (request, result) => {
    return getAllLicenses(request, result)
})

licensesRouter.get('/getFavourite', (request, result) => {
    return getFavouriteLicenses(request, result)
})

licensesRouter.get('/getSold', (request, result) => {
    return getSoldLicenses(request, result)
})

licensesRouter.delete('/delete', (request, result) => {
    return deleteLicense(request, result)
})

licensesRouter.post('/handleFavourite', (request, result) => {
    return handleFavouriteRoute(request, result)
})

licensesRouter.post('/cancel', (request, result) => {
    return cancelLicense(request, result)
})

async function handleFavouriteRoute(request, result) {
    try {
        const {licenseId} = request.body
        const isFavourite = await licensesController.handleFavourite(licenseId)
        console.log(isFavourite)
        result.status(200).json({
            success: true,
            licenseId: licenseId,
            isFavourite: isFavourite
        })
    } catch (e) {
        const message = "Error in handle favourite route: "
        console.log(message + e.message)
        result.status(500).json({
            success: false,
            message: message + e.message
        })
    }
}

async function cancelLicense(request, result) {
    try {
        const {licenseId} = request.body
        if (licenseId !== undefined) {
            await licensesController.cancelLicense(licenseId)
            result.status(200).json({
                success: true,
                licenseId: licenseId
            })
        }
    } catch (e) {
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
        if (licenseId !== undefined) {
            await licensesController.deleteLicense(licenseId)
            result.status(200).json({
                success: true,
                licenseId: licenseId
            })
        }
    } catch (e) {
        console.log("Error while delete license: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error while delete license: " + e.message
        })
    }
}

async function getSoldLicenses(request, result) {
    try {

        const licenses = await getLicenses(request, "sold")

        result.status(200).json({
            success: true,
            licenses: licenses
        })

    } catch (e) {
        console.log("Error in getting licenses: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error in getting licenses: " + e.message
        })
    }
}

async function getFavouriteLicenses(request, result) {
    try {

        const licenses = await getLicenses(request, "favourite")

        result.status(200).json({
            success: true,
            licenses: licenses
        })

    } catch (e) {
        console.log("Error in getting licenses: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error in getting licenses: " + e.message
        })
    }
}

async function getAllLicenses(request, result) {
    try {

        const licenses = await getLicenses(request, "all")

        result.status(200).json({
            success: true,
            licenses: licenses
        })

    } catch (e) {
        console.log("Error in getting licenses: " + e.message)
        result.status(500).json({
            success: false,
            message: "Error in getting licenses: " + e.message
        })
    }
}

async function getLicenses(request, type) {
    const token = request.get('token')
    if(type === "all"){
        const licenses = await licensesController.getAllUserLicenses(token)
        return await convertLicenses(licenses)
    } else if(type === "favourite"){
        const licenses = await licensesController.getFavouriteLicenses(token)
        return await convertLicenses(licenses)
    } else {
        const licenses = await licensesController.getSoldLicenses(token)
        return await convertLicenses(licenses)
    }
}

async function convertLicenses(licenses) {
    return await Promise.map(licenses, async (license) => {
        const requirementsProgress = await licensesController.getLicenseRequirementsProgress(license.id)
        const room = await roomController.getRoom(license.room_id)
        return {
            id: license.id,
            status: license.status,
            name: room.name,
            type: room.type,
            owner: room.owner,
            date: license.date,
            isFavourite: license.is_favourite,
            uid: license.uid,
            progress: requirementsProgress
        }
    })
}