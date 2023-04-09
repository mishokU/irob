const db = require("../db");

const ROOM_TABLE_NAME = "rooms"

module.exports = {
    getRoom,
    getRooms,
    updateFirstAgreement,
    updateSecondAgreement,
    isRoomAdmin,
    updateRoomWithUser,
    updateRoomWithoutUser
}

async function getRooms() {
    const data = await db.query(`SELECT * FROM rooms`)
    return data.rows
}

async function updateFirstAgreement(roomId, isAgree) {
    try {
        await db.query(`
                UPDATE rooms SET first_agreement = $1 WHERE room_id= $2;`, [isAgree, roomId]
        )
    } catch (e) {
        console.log("Error in update first agreement: " + e.message)
    }
}

async function updateSecondAgreement(roomId, isAgree) {
    try {
        await db.query(`
                UPDATE rooms SET second_agreement = $1 WHERE room_id= $2;`, [isAgree, roomId]
        )
    } catch (e) {
        console.log("Error in updateSecondAgreement: " + e.message)
    }
}

async function isRoomAdmin(userId, roomId) {
    try {
        const data = await db.query(`
                    SELECT * from ${ROOM_TABLE_NAME}
                    WHERE room_id= $1 AND (owner_id= $2 OR user_id= $2)`, [roomId, userId]
        )
        return data.rows[0] !== undefined
    } catch (e) {
        console.log("is room admin error: " + e.message)
    }
}

async function getRoom(roomId) {
    try {
        const data = await db.query(`SELECT * FROM rooms WHERE room_id= $1;`, [roomId])
        return data.rows[0]
    } catch (e) {
        console.log("Error in get room by room id: " + e.message)
    }
}

async function updateRoomWithUser(roomId, newName, type, owner, userId) {
    try {
        await db.query(`
            UPDATE rooms SET name = $1, user_id = $3, type=$4, owner=$5
            WHERE room_id= $2;`, [newName, roomId, Number(userId), type, owner]
        )
    } catch (e) {
        console.log("Error in updating room: " + e.message)
    }
}

async function updateRoomWithoutUser(roomId, newName, type, owner) {
    try {
        await db.query(`
            UPDATE rooms SET name = $1, type=$3, owner=$4
            WHERE room_id= $2;`, [newName, roomId, type, owner]
        )
    } catch (e) {
        console.log("Error in updating room: " + e.message)
    }
}