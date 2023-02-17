const db = require("../db");

const ROOM_TABLE_NAME = "rooms"

module.exports = {
    isRoomAdmin: async function (userId, roomId) {
        const data = await db.query(`
            SELECT * from ${ROOM_TABLE_NAME}
            WHERE room_id= $1 AND owner_id= $2`, [roomId, userId]
        )
        return data.rows[0] !== undefined
    },
    updateRoomName: async function (roomId, newName){
        await db.query(`
            UPDATE rooms SET name= $1 WHERE room_id= $2;`, [newName, roomId]
        )
    }
}