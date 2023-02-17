const db = require("../db");

const userController = require("../controllers/UserController");

const ROOM_USERS_TABLE_NAME = "room_users"

module.exports = {
    getRoomUsers: async function (token, roomId) {
        const user = await userController.getUser(token)
        const data = await db.query(`
            SELECT * from ${ROOM_USERS_TABLE_NAME}
            WHERE room_id= $1 AND user_id!= $2`, [roomId, user.id]
        )
        return data.rows
    },
    hasUser: async function (token, roomId) {
        const user = await userController.getUser(token)
        const data = await db.query(`
            SELECT * from ${ROOM_USERS_TABLE_NAME}
            WHERE room_id= $1 and user_id= $2`, [roomId, user.id]
        )
        return data.rows.length !== 0
    },
    hasUserWithId: async function (userId, roomId) {
        const data = await db.query(`
            SELECT * from ${ROOM_USERS_TABLE_NAME}
            WHERE room_id= $1 and user_id= $2`, [roomId, userId]
        )
        return data.rows.length !== 0
    },
    joinUserToRoom: async function (token, roomId) {
        const user = await userController.getUser(token)
        await db.query(`
            INSERT INTO ${ROOM_USERS_TABLE_NAME}
            (user_id, room_id)
            VALUES (${user.id}, '${roomId}')
          `
        )
    },
    joinUser: async function (userId, roomId) {
        console.log("userId: " + userId)
        console.log("roomId: " + roomId)
        await db.query(`
            INSERT INTO ${ROOM_USERS_TABLE_NAME}
            (user_id, room_id)
            VALUES (${userId}, '${roomId}')
          `
        )
    },
    deleteUser: async function (userId, roomId) {
        await db.query(`
            DELETE FROM ${ROOM_USERS_TABLE_NAME}
            WHERE room_id=$1 and user_id=$2
        `, [roomId, userId])
    },
    leaveFromRoom: async function (token, roomId) {
        const user = await userController.getUser(token)
        await db.query(`
            DELETE FROM ${ROOM_USERS_TABLE_NAME}
            WHERE room_id=$1 and user_id=$2
        `, [roomId, user.id])
    }
}