const db = require("../db");
const uuidv4 = require('uuid').v4;

const LICENSES_TABLE_NAME = "licenses"

const userController = require("../controllers/UserController");
const roomRequirementsController = require("../controllers/RoomRequirementsController")

module.exports = {
    getLicenses: async function (token) {
        try {
            const user = await userController.getUser(token)
            const data = await db.query(`SELECT * FROM ${LICENSES_TABLE_NAME} WHERE user_id= $1;`, [user.id])
            return data.rows
        } catch (e) {
            console.log("Error in getting user licenses: " + e.message)
        }
    },
    getLicenseByRoomId: async function (roomId) {
        try {
            const data = await db.query(`SELECT * from ${LICENSES_TABLE_NAME} WHERE room_id=$1`, [roomId])
            return data.rows[0]
        } catch (e){
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
        } catch (e){
            console.log("Error in get license requirements: " + e.message)
        }
    },
    createLicense: async function(roomId, name, owner, userId, address) {
        try {
            const uid = uuidv4()
            const datetime = new Date();
            const date = datetime.toISOString().slice(0, 10)
            const data = await db.query(`
                INSERT INTO ${LICENSES_TABLE_NAME}
                (uid, status, name, owner, date, is_favourite, user_id, address, room_id)
                VALUES ('${uid}', 'running', '${name}','${owner}', '${date}', false, ${userId}, '${address}', '${roomId}')
                RETURNING id
           `)
            return data.rows[0].id
        } catch (e){
            console.log("Error in creating license: " + e.message)
            return null
        }
    },
    deleteLicense: async function(licenseId){
        try {
            await db.query(`
                DELETE FROM ${LICENSES_TABLE_NAME} WHERE id=$1
            `, [licenseId])
        } catch (e){
            console.log("Error in deleting license from db: " + e.message)
        }
    },
    cancelLicense: async function (licenseId) {
        try {
            await db.query(`
                UPDATE ${LICENSES_TABLE_NAME} SET status='canceled' WHERE id=$1
            `, [licenseId])
        } catch (e){
            console.log("Error in cancel license: " + e.message)
        }
    }
}