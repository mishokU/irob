const db = require("../db");

const ROOM_TABLE_NAME = "rooms"

module.exports = {
    getRoom: async function (roomId) {
        const data = await db.query(`SELECT * FROM rooms WHERE room_id= $1;`, [roomId])
        return data.rows[0]
    },
    updateFirstAgreement: async function(roomId, isAgree){
        await db.query(`
            UPDATE rooms SET first_agreement = $1 WHERE room_id= $2;`, [isAgree, roomId]
        )
    },
    updateSecondAgreement: async function(roomId, isAgree){
        await db.query(`
            UPDATE rooms SET second_agreement = $1 WHERE room_id= $2;`, [isAgree, roomId]
        )
    },
    isRoomAdmin: async function (userId, roomId) {
        try {
            const data = await db.query(`
                    SELECT * from ${ROOM_TABLE_NAME}
                    WHERE room_id= $1 AND (owner_id= $2 OR user_id= $2)`, [roomId, userId]
            )
            return data.rows[0] !== undefined
        } catch (e){
            console.log("is room admin error: " + e.message)
        }
    },
    updateRoom: async function (roomId, newName, userId) {
        await db.query(`
            UPDATE rooms SET name = $1, user_id = $3 
            WHERE room_id= $2;`, [newName, roomId, Number(userId)]
        )
    }
}