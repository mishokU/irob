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
        const data = await db.query(`
            SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
            WHERE room_id= $1`, [roomId]
        )
        return await Promise.map(data.rows, async (requirement) => {
            const user = await userController.getUserById(requirement.user_id)
            const fullName = user.name + " " + user.surname
            return {
                username: fullName,
                requirementId: requirement.id
            }
        }, {concurrency: data.rows.length})
    },
    getRequirement: async function (requirementId) {
        const data = await db.query(`
            SELECT * from ${ROOM_REQUIREMENTS_TABLE_NAME}
            WHERE id= $1`, [requirementId]
        )
        return data.rows
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

}