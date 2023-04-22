const db = require("../db");

const userController = require("./UserController");
const contentController = require("./ContentController")

const ROOM_TABLE_NAME = "rooms"

module.exports = {
    createRoom,
    getRoom,
    getRooms,
    updateFirstAgreement,
    updateSecondAgreement,
    isRoomAdmin,
    updateRoomWithUser,
    updateRoomWithoutUser,
    getContentId,
    updateContentId,
    checkOnBuyer
}

async function checkOnBuyer(contentId, token){
    try {

        const user = await userController.getUser(token)
        const content = await contentController.getContentById(contentId)

        return user.id !== content.user_id

    } catch (e){

    }
}

async function updateContentId(roomId, contentId) {
    try {

        await db.query(`
                UPDATE ${ROOM_TABLE_NAME} SET content_id=$1 WHERE room_id=$2;`, [contentId, roomId]
        )

    } catch (e) {
        console.log("Error in updating room content: " + e.message)
    }
}

async function getContentId(roomId) {
    try {

        console.log(roomId)

        const data = await db.query(`
            SELECT content_id FROM ${ROOM_TABLE_NAME} WHERE room_id=$1
        `, [roomId])

        return data.rows[0].content_id

    } catch (e) {
        console.log("Error in get content id: " + e.message)
    }
}

async function createRoom(roomId, title, userId, contentId, token) {
    try {

        const user = await userController.getUser(token)

        await db.query(`
            INSERT INTO rooms
            (room_id, owner_id, name, first_agreement, second_agreement, user_id, content_id)
            VALUES ('${roomId}', '${user.id}', '${title}', false, false, '${userId}', '${contentId}')
        `)

    } catch (e) {
        console.log("Error in creating room: " + e.message)
    }
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

async function updateRoomWithUser(roomId, newName, userId) {
    try {
        await db.query(`UPDATE rooms SET name = $1, user_id = $3 WHERE room_id= $2;`, [newName, roomId, Number(userId)])
    } catch (e) {
        console.log("Error in updating room with user: " + e.message)
    }
}

async function updateRoomWithoutUser(roomId, newName) {
    try {
        await db.query(`UPDATE rooms SET name=$1 WHERE room_id= $2;`, [newName, roomId])
    } catch (e) {
        console.log("Error in updating room without user: " + e.message)
    }
}