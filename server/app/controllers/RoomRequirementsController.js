const db = require("../db");
const userController = require("./UserController");
const Promise = require("bluebird");

const ROOM_REQUIREMENTS_TABLE_NAME = "room_requirements"

module.exports = {
    createRequirement: async function (token, roomId, title, description, value, type) {
        const user = await userController.getUser(token)
        const data = await db.query(`
              INSERT INTO ${ROOM_REQUIREMENTS_TABLE_NAME}
              (room_id, user_id, title, description, type, value, is_alive)
              VALUES ('${roomId}', ${user.id}, '${title}','${description}', '${type}', '${value}', true)
              RETURNING id
        `)
        let username = ""
        if(user.name === "" || user.surname === ""){
            username = user.email
        } else {
            username = user.name + " " + user.surname
        }
        return {
            username: username,
            requirementId: data.rows[0].id
        }
    },
    getRoomRequirements: async function (roomId) {
        try {
            const data = await db.query(`
                SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
                WHERE room_id= $1`, [roomId]
            )
            if (data.rows.length === 0) {
                return []
            } else {
                return await Promise.map(data.rows, async (requirement) => {
                    const user = await userController.getUserById(requirement.user_id)
                    let username = ""
                    if(user.name === "" || user.surname === ""){
                        username = user.email
                    } else {
                        username = user.name + " " + user.surname
                    }
                    return {
                        username: username,
                        isAlive: requirement.is_alive,
                        userId: user.id,
                        type: requirement.type,
                        value: requirement.value,
                        requirementId: requirement.id
                    }
                }, {concurrency: 2})
            }
        } catch (e) {
            console.log("load room requirements: " + e.message)
        }
    },
    getRequirement: async function (requirementId) {
        try {
            const data = await db.query(`
            SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
            WHERE id= $1`, [requirementId]
            )
            return data.rows[0]
        } catch (e){
            console.log("Error get requirement: " + e.message)
        }
    },
    applyRequirement: async function (requirementId) {
        await db.query(`
            UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME} SET
            is_alive=false WHERE id= $1`, [requirementId]
        )
    },
    declineRequirement: async function (requirementId) {
        await db.query(`
            DELETE FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE id= $1`, [requirementId]
        )
    },
    getRequiredRequirements: async function (roomId) {
        try {
            const data = await db.query(
                `SELECT * FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE (room_id= $1 AND 
                 (type='Duration days' OR type='Hold deposit' OR type='Cost') AND is_alive=false)`, [roomId]
            )
            return data.rowCount
        } catch (e) {
            console.log("error in get required requirements count error: " + e.message)
        }
    },
    getRoomRequirementsByLicenseId: async function (licenseId) {
        try {
            const requirements = await db.query(
                `SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE license_id=$1`, [licenseId]
            )
            return requirements.rows
        } catch (e) {
            console.log("Error in getting room requirements by license id: " + e.message)
        }
    },
    updateRequirements: async function (licenseId, roomId) {
        try {
            await db.query(`
                UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME} 
                SET license_id=$2 WHERE room_id=$1`, [roomId, licenseId]
            )
        } catch (e) {
            console.log("Error in adding license id to room requirements: " + e.message)
        }
    }
}