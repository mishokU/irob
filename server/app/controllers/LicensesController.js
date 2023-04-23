const db = require("../db");
const uuidv4 = require('uuid').v4;

const LICENSES_TABLE_NAME = "licenses"

const userController = require("./UserController");
const roomRequirementsController = require("./RoomRequirementsController")
const roomController = require("./RoomControllers")

module.exports = {
    getAllUserLicenses,
    getAllLicenses,
    getFavouriteLicenses,
    getSoldLicenses,
    getLicenseByRoomId,
    getLicenseById,
    getLicenseBySecretKey,
    getLicenseRequirementsProgress,
    createLicense,
    handleFavourite,
    deleteLicense,
    cancelLicense,
    updateLicenseRequirement
}

async function getLicenseBySecretKey(licenseKey) {
    try {

        const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE uid= $1;`, [licenseKey])

        return data.rows[0]

    } catch (e){
        console.log("Error in getting user all licenses: " + e.message)
    }
}

async function getAllUserLicenses(token) {
    try {
        const user = await userController.getUser(token)
        const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE user_id= $1;`, [user.id])
        return data.rows
    } catch (e) {
        console.log("Error in getting user all licenses: " + e.message)
    }
}

async function getAllLicenses() {
    try {
        const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME}`)
        return data.rows
    } catch (e) {
        console.log("Error in getting user all licenses: " + e.message)
    }
}

async function getFavouriteLicenses(token) {
    try {
        const user = await userController.getUser(token)
        const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE user_id= $1 AND is_favourite=$2;`, [user.id, true])
        return data.rows
    } catch (e) {
        console.log("Error in getting user favourite licenses: " + e.message)
    }
}

async function getSoldLicenses(token) {
    try {

        /*
            Get all deals where account not equal to buyer
            and also the second side of a deal in room
        */

        const user = await userController.getUser(token)

        const results = await this.getAllLicenses()

        const rooms = await roomController.getRooms()

        const roomIds = []
        results.forEach((result) => {
            rooms.forEach((room) => {
                if ((user.id === room.owner_id || user.id === room.user_id) && user.id !== result.user_id) {
                    roomIds.push(room.room_id)
                }
            })
        })

        const argument = "(" + roomIds.map((value) => `\'${value}\'`) + ")"

        const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE room_id IN ${argument}`)

        return data.rows
    } catch (e) {
        console.log("Error in getting sold licenses: " + e.message)
    }
}

async function getLicenseByRoomId(roomId) {
    try {
        const data = await db.query(`SELECT * from ${LICENSES_TABLE_NAME} WHERE room_id=$1`, [roomId])
        return data.rows[0]
    } catch (e) {
        console.log("Error in get license by room id: " + e.message)
    }
}

async function getLicenseById(licenseId) {
    try {
        const data = await db.query(`SELECT * from ${LICENSES_TABLE_NAME} WHERE id=$1`, [licenseId])
        return data.rows[0]
    } catch (e) {
        console.log("Error in get license by room id: " + e.message)
    }
}

async function getLicenseRequirementsProgress(licenseId) {
    try {
        const requirements = await roomRequirementsController.getRoomRequirementsByLicenseId(licenseId)
        let fullProgress = 0;
        let currentProgress = 0;
        requirements.forEach((requirement) => {
            fullProgress += Number(requirement.value)
            currentProgress += Number(requirement.current_value)
        })

        if (currentProgress === 0) {
            return 0
        }

        return (Number(currentProgress) * 100) / Number(fullProgress)
    } catch (e) {
        console.log("Error in get license progress: " + e.message)
    }
}

async function createLicense(roomId, userId, address, contentId) {
    try {
        const uid = uuidv4()
        const datetime = new Date();
        const date = datetime.toISOString().slice(0, 10)
        const data = await db.query(`
                INSERT INTO ${LICENSES_TABLE_NAME}
                (uid, status, date, is_favourite, user_id, address, room_id, content_id)
                VALUES ('${uid}', 'running', '${date}', false, ${userId}, '${address}', '${roomId}', '${contentId}')
                RETURNING id
           `)
        return data.rows[0].id
    } catch (e) {
        console.log("Error in creating license: " + e.message)
        return null
    }
}

async function handleFavourite(licenseId) {
    try {
        const license = await this.getLicenseById(licenseId)
        const revertedFavouriteStatus = !license.is_favourite
        await db.query(`
                UPDATE ${LICENSES_TABLE_NAME} SET is_favourite=$1 where id=$2
            `, [revertedFavouriteStatus, licenseId])
        return revertedFavouriteStatus
    } catch (e) {
        console.log("Error in handle favourite: " + e.message)
    }
}

async function deleteLicense(licenseId) {
    try {
        await db.query(`
                DELETE FROM ${LICENSES_TABLE_NAME} WHERE id=$1
            `, [licenseId])
    } catch (e) {
        console.log("Error in deleting license from db: " + e.message)
    }
}

async function cancelLicense(licenseId) {
    try {
        await db.query(`
                UPDATE ${LICENSES_TABLE_NAME} SET status='canceled' WHERE id=$1
            `, [licenseId])
    } catch (e) {
        console.log("Error in cancel license: " + e.message)
    }
}

async function updateLicenseRequirement(key, type) {
    try {

        const license = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE uid=$1`, [key])

        if (license.rows[0] !== undefined) {
            return await roomRequirementsController.updateRequirementValue(license.rows[0].id, type)
        } else {
            return "There is no such license with current key!"
        }

    } catch (e) {
        console.log("Error in updating license requirement: " + e.message)
    }
}