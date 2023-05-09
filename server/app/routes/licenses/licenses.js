const {Router} = require("express");

const licensesController = require("../../controllers/LicensesController")
const roomController = require("../../controllers/RoomControllers")
const contentController = require("../../controllers/ContentController")

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
        const address = request.query.address
        if (licenseId !== undefined && address !== undefined) {

            await licensesController.deleteLicense(licenseId)

            result.status(200).json({
                success: true,
                licenseId: Number(licenseId)
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
    if (type === "all") {
        const licenses = await licensesController.getAllUserLicenses(token)
        return await convertLicenses(licenses, true)
    } else if (type === "favourite") {
        const licenses = await licensesController.getFavouriteLicenses(token)
        return await convertLicenses(licenses, false)
    } else {
        const licenses = await licensesController.getSoldLicenses(token)
        return await convertLicenses(licenses, false)
    }
}

async function convertLicenses(licenses, isPrivateKeyButtonVisible) {
    return await Promise.map(licenses, async (license) => {
        const requirementsProgress = await licensesController.getLicenseRequirementsProgress(license.id)
        const room = await roomController.getRoom(license.room_id)
        const content = await contentController.getContentById(license.content_id)
        const date = new Date(license.date)
        const dateValue = date.toISOString().slice(0, 10)

        let name
        let owner
        let type
        let roomId

        if (content !== undefined) {
            name = content.name
            type = content.type
            owner = content.owner
            if (room !== undefined) {
                roomId = room.room_id
            }
        } else if (room !== undefined) {
            if(room.name){
                name = room.name
            } else {
                name = "Room was deleted!"
            }
            if(room.type){
                type = room.type
            } else {
                type = "Undefined"
            }
            if(room.owner){
                owner = room.owner
            } else {
                owner = "Somebody"
            }
        } else {
            name = "Original content deleted!"
            owner = "Somebody"
            type = "Undefined"
        }

        return {
            id: license.id,
            status: license.status,
            name: name,
            type: type,
            owner: owner,
            address: license.address,
            isPrivateKeyButtonVisible: isPrivateKeyButtonVisible,
            date: dateValue,
            roomId: roomId,
            userId: license.user_id,
            isFavourite: license.is_favourite,
            uid: license.uid,
            progress: Number(requirementsProgress).toFixed(2)
        }

    })
}