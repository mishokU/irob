const db = require("../db");

const ROOM_RESULTS_TABLE_NAME = "room_result"

module.exports = {
    createRoomResult: async function (roomId, requirements, gas, deposit) {
        const data = await db.query(`
              INSERT INTO ${ROOM_RESULTS_TABLE_NAME}
              (requirements, gas, deposit, room_id)
              VALUES (${requirements}, ${gas}, ${deposit},'${roomId}')
              RETURNING id
        `)
        return {
            id: data.rows[0].id
        }
    },
    getRoomResult: async function(roomId) {
        try {
            const data = await db.query(`
                SELECT * from ${ROOM_RESULTS_TABLE_NAME}
                WHERE room_id = $1`, [roomId]
            )
            return data.rows[0]
        } catch (e){
            console.log("Error in getting room result: " + e.message)
        }
    }
}