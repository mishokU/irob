const db = require("../db");
const userController = require("./UserController");
const Promise = require("bluebird");
const {getUsername} = require("./Utils");

const ROOM_REQUIREMENTS_TABLE_NAME = "room_requirements"

module.exports = {
    createRequirement,
    getRoomRequirements,
    getRequirement,
    applyRequirement,
    declineRequirement,
    getRequiredRequirements,
    getRoomRequirementsByLicenseId,
    updateRequirements,
    updateRoomRequirement,
    updateRequirementValue
}

async function updateRoomRequirement(id, title, description, value) {
    try {

        await db.query(`
            UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME}
            SET title=$2, description=$3, value=$4 WHERE id=$1
        `, [id, title, description, value])

    } catch (e) {
        console.log("Error in updating db requirement: " + e.message)
    }
}

async function updateRequirements(licenseId, roomId) {
    try {
        await db.query(`
                UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME} 
                SET license_id=$2 WHERE room_id=$1`, [roomId, licenseId]
        )
    } catch (e) {
        console.log("Error in adding license id to room requirements: " + e.message)
    }
}

async function getRoomRequirementsByLicenseId(licenseId) {
    try {
        const requirements = await db.query(
            `SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE license_id=$1`, [licenseId]
        )
        return requirements.rows
    } catch (e) {
        console.log("Error in getting room requirements by license id: " + e.message)
    }
}

async function getRequiredRequirements(roomId) {
    try {
        const data = await db.query(
            `SELECT * FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE (room_id= $1 AND 
                 (type='Duration' OR type='Hold deposit' OR type='Cost') AND is_alive=false)`, [roomId]
        )
        return data.rowCount
    } catch (e) {
        console.log("error in get required requirements count error: " + e.message)
    }
}

async function declineRequirement(requirementId) {
    await db.query(`DELETE FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE id= $1`, [requirementId])
}

async function applyRequirement(requirementId, type, roomId) {
    //await db.query(`DELETE FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE type=$1 and room_id=$2`, [type, roomId])
    await db.query(`
            UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME} SET
            is_alive=false WHERE id=$1`, [requirementId]
    )
}

async function getRequirement(requirementId) {
    try {
        const data = await db.query(`
            SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
            WHERE id= $1`, [requirementId]
        )
        return data.rows[0]
    } catch (e) {
        console.log("Error get requirement: " + e.message)
    }
}

async function getRoomRequirements(roomId) {
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
                let id = 0
                if (user) {
                    username = getUsername(user)
                    id = user.id
                } else {
                    username = "User deleted!"
                    id = -1
                }
                return {
                    username: username,
                    isAlive: requirement.is_alive,
                    userId: id,
                    type: requirement.type,
                    value: requirement.value,
                    requirementId: requirement.id
                }
            }, {concurrency: 2})
        }
    } catch (e) {
        console.log("load room requirements: " + e.message)
    }
}

async function createRequirement(userId, roomId, title, description, value, type) {
    const data = await db.query(`
              INSERT INTO ${ROOM_REQUIREMENTS_TABLE_NAME}
              (room_id, user_id, title, description, type, value, is_alive)
              VALUES ('${roomId}', ${userId}, '${title}','${description}', '${type}', '${value}', true)
              RETURNING id
        `)
    return data.rows[0].id
}

async function updateRequirementValue(id, type) {
    try {

        const value = await db.query(`SELECT current_value FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE license_id=$1 AND type=$2`, [id, type])

        if (value.rows[0] !== undefined) {
            await db.query(`
                UPDATE ${ROOM_REQUIREMENTS_TABLE_NAME} 
                SET current_value = newValue WHERE license_id=$1 AND type=$2`, [id, type]
            )
        } else {
            const message = "There is no available type in requirements!"
            console.log(message)
            return message
        }

    } catch (e) {
        console.log("Error in update requirement value: " + e.message)
    }
}