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
        const fullName = user.name + " " + user.surname
        return {
            username: fullName,
            requirementId: data.rows[0].id
        }
    },
    getRoomRequirements: async function (roomId) {
        try {
            const data = await db.query(`
                SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
                WHERE room_id= $1`, [roomId]
            )
            if(data.rows.length === 0) {
                return []
            } else {
                return await Promise.map(data.rows, async (requirement) => {
                    const user = await userController.getUserById(requirement.user_id)
                    const fullName = user.name + " " + user.surname
                    return {
                        username: fullName,
                        isAlive: requirement.is_alive,
                        userId: user.id,
                        requirementId: requirement.id
                    }
                }, {concurrency: 2})
            }
        } catch (e){
            console.log("load room requirements: " + e.message)
        }
    },
    getRequirement: async function (requirementId) {
        const data = await db.query(`
            SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
            WHERE id= $1`, [requirementId]
        )
        return data.rows[0]
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
    getRequiredRequirements: async function (roomId){
        try {
            const data = await db.query(
                `SELECT * FROM ${ROOM_REQUIREMENTS_TABLE_NAME} WHERE (room_id= $1 AND 
                 (type='Duration days' OR type='Hold deposit' OR type='Cost') AND is_alive=false)`, [roomId]
            )
            return data.rowCount
        } catch (e){
            console.log("error in get required requirements count error: " + e.message)
        }
    }

}