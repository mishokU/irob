const db = require("../db");

const userController = require("../controllers/UserController");

const ROOM_USERS_TABLE_NAME = "room_users"

module.exports = {
    getRoomUsers: async function (token, roomId) {
        try {
            const user = await userController.getUser(token)
            console.log("user: " + user.id)
            const data = await db.query(`
                SELECT * from ${ROOM_USERS_TABLE_NAME}
                WHERE room_id= $1 AND user_id != $2`, [roomId, user.id]
            )
            return data.rows
        } catch (e){
            console.log("error in get room users: " + e.message)
            console.log("token: " + token)
            console.log("room id" + roomId)
        }
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
        try {
            const data = await db.query(`
            SELECT * from ${ROOM_USERS_TABLE_NAME}
                WHERE room_id= $1 and user_id= $2`, [roomId, userId]
            )
            return data.rows.length !== 0
        } catch (e) {
            console.log("has user with id error: " + e.message)
        }
    },
    joinUserToRoom: async function (token, roomId) {
        try {

        } catch (e){

        }
        const user = await userController.getUser(token)
        await db.query(`
            INSERT INTO ${ROOM_USERS_TABLE_NAME}
            (user_id, room_id)
            VALUES (${user.id}, '${roomId}')
          `
        )
    },
    joinUser: async function (userId, roomId) {
        try {
            await db.query(`
                    INSERT INTO ${ROOM_USERS_TABLE_NAME}
                    (user_id, room_id)
                    VALUES (${userId}, '${roomId}')
                `
            )
        } catch (e) {
            console.log("join user error: " + e.message)
            console.log("user id: " + userId)
            console.log("room id: " + roomId)
        }
    },
    deleteUser: async function (userId, roomId) {
        try {
            await db.query(`
            DELETE FROM ${ROOM_USERS_TABLE_NAME}
            WHERE room_id=$1 and user_id=$2
        `, [roomId, userId])
        } catch (e){
            console.log("user from room" + e.message)
        }
    },
    leaveFromRoom: async function (token, roomId) {
        try {
            const user = await userController.getUser(token)
            await db.query(`
            DELETE FROM ${ROOM_USERS_TABLE_NAME}
            WHERE room_id=$1 and user_id=$2
        `, [roomId, user.id])
        } catch (e){
            console.log("leave from room error: " + e.message)
            console.log("token: " + token)
            console.log("room id: " + roomId)
        }
    }
}