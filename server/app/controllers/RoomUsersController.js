const db = require("../db");

const ROOM_USERS_TABLE_NAME = "room_users"

module.exports = {
    getRoomUsers,
    hasUser,
    hasUserWithId,
    joinUserToRoom,
    leaveFromRoom
}

async function getRoomUsers(userId, roomId) {
    try {
        const data = await db.query(`
                SELECT * from ${ROOM_USERS_TABLE_NAME}
                WHERE room_id= $1 AND user_id != $2`, [roomId, userId]
        )
        return data.rows
    } catch (e) {
        console.log("Error in get room users: " + e.message)
    }
}

async function hasUser(userId, roomId) {
    try {
        const data = await db.query(`
                SELECT * from ${ROOM_USERS_TABLE_NAME}
                WHERE room_id= $1 and user_id= $2`, [roomId, userId]
        )
        return data.rows.length !== 0
    } catch (e) {
        console.log("Error in has user: " + e.message)
    }
}

async function hasUserWithId(userId, roomId) {
    try {
        const data = await db.query(`
            SELECT * from ${ROOM_USERS_TABLE_NAME}
                WHERE room_id= $1 and user_id= $2`, [roomId, userId]
        )
        return data.rows.length !== 0
    } catch (e) {
        console.log("has user with id error: " + e.message)
    }
}

async function joinUserToRoom(userId, roomId) {
    try {
        await db.query(`
                INSERT INTO ${ROOM_USERS_TABLE_NAME}
                (user_id, room_id)
                VALUES (${userId}, '${roomId}')`
        )
    } catch (e) {
        console.log("Join user to room error: " + e.message)
    }
}

async function leaveFromRoom(userId, roomId) {
    try {
        await db.query(`
            DELETE FROM ${ROOM_USERS_TABLE_NAME}
            WHERE room_id=$1 and user_id=$2
        `, [roomId, userId])
    } catch (e) {
        console.log("leave from room error: " + e.message)
    }
}