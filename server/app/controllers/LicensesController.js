const db = require("../db");
const uuidv4 = require('uuid').v4;

const LICENSES_TABLE_NAME = "licenses"

const userController = require("./UserController");
const roomRequirementsController = require("./RoomRequirementsController")
const roomController = require("./RoomControllers")

module.exports = {
    getAllUserLicenses: async function (token) {
        try {
            const user = await userController.getUser(token)
            const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE user_id= $1;`, [user.id])
            return data.rows
        } catch (e) {
            console.log("Error in getting user all licenses: " + e.message)
        }
    },
    getAllLicenses: async function() {
        try {
            const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME}`)
            return data.rows
        } catch (e) {
            console.log("Error in getting user all licenses: " + e.message)
        }
    },
    getFavouriteLicenses: async function (token) {
        try {
            const user = await userController.getUser(token)
            const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE user_id= $1 AND is_favourite=$2;`, [user.id, true])
            return data.rows
        } catch (e) {
            console.log("Error in getting user favourite licenses: " + e.message)
        }
    },
    getSoldLicenses: async function (token) {
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
    },
    getLicenseByRoomId: async function (roomId) {
        try {
            const data = await db.query(`SELECT * from ${LICENSES_TABLE_NAME} WHERE room_id=$1`, [roomId])
            return data.rows[0]
        } catch (e) {
            console.log("Error in get license by room id: " + e.message)
        }
    },
    getLicenseById: async function (licenseId) {
        try {
            const data = await db.query(`SELECT * from ${LICENSES_TABLE_NAME} WHERE id=$1`, [licenseId])
            return data.rows[0]
        } catch (e) {
            console.log("Error in get license by room id: " + e.message)
        }
    },
    getLicenseRequirementsProgress: async function (licenseId) {
        try {
            const requirements = await roomRequirementsController.getRoomRequirementsByLicenseId(licenseId)
            let fullProgress = 0;
            let currentProgress = 0;
            requirements.forEach((requirement) => {
                fullProgress += Number(requirement.value)
                currentProgress += Number(requirement.current_value)
            })
            return (Number(currentProgress) * 100) / Number(fullProgress)
        } catch (e) {
            console.log("Error in get license requirements: " + e.message)
        }
    },
    createLicense: async function (roomId, userId, address) {
        try {
            const uid = uuidv4()
            const datetime = new Date();
            const date = datetime.toISOString().slice(0, 10)
            const data = await db.query(`
                INSERT INTO ${LICENSES_TABLE_NAME}
                (uid, status, date, is_favourite, user_id, address, room_id)
                VALUES ('${uid}', 'running', '${date}', false, ${userId}, '${address}', '${roomId}')
                RETURNING id
           `)
            return data.rows[0].id
        } catch (e) {
            console.log("Error in creating license: " + e.message)
            return null
        }
    },
    handleFavourite: async function (licenseId) {
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
    },
    deleteLicense: async function (licenseId) {
        try {
            await db.query(`
                DELETE FROM ${LICENSES_TABLE_NAME} WHERE id=$1
            `, [licenseId])
        } catch (e) {
            console.log("Error in deleting license from db: " + e.message)
        }
    },
    cancelLicense: async function (licenseId) {
        try {
            await db.query(`
                UPDATE ${LICENSES_TABLE_NAME} SET status='canceled' WHERE id=$1
            `, [licenseId])
        } catch (e) {
            console.log("Error in cancel license: " + e.message)
        }
    }
}