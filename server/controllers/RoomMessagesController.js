const db = require("../db");

const ROOM_MESSAGES_TABLE_NAME = "room_messages"

module.exports = {
    getRoomMessages: async function (roomId, limit, offset, fullRows) {
        const data = await db.query(`
            WITH messages AS (
                SELECT * from ${ROOM_MESSAGES_TABLE_NAME}
                WHERE room_id= $1 ORDER BY id DESC LIMIT $2 OFFSET $3
            )
            SELECT * FROM messages ORDER BY id ASC;`, [roomId, limit, offset]
        )
        return data.rows
    },
    getRoomMessagesCount: async function(roomId){
        const data = await db.query(`SELECT COUNT(*) as count_rows FROM ${ROOM_MESSAGES_TABLE_NAME} WHERE room_id=$1;`, [roomId])
        return data.rows[0].count_rows
    },
    //DELETE ALL INFO about user except user_id
    addRoomMessage: async function (
        roomId,
        userId,
        content,
        date,
        avatar,
        type,
        username
    ) {
        await db.query(`
            INSERT INTO ${ROOM_MESSAGES_TABLE_NAME} 
            (room_id, user_id, content, date, avatar, type, username)
            VALUES ('${roomId}', ${Number(userId)}, '${content}','${date}', '${avatar}', ${Number(type)}, '${username}')   
          `)
    },
    getLastMessage: async function(roomId){
        try {
            const lastMessage = await db.query(`
                SELECT content, date FROM ${ROOM_MESSAGES_TABLE_NAME}
                WHERE room_id= $1 ORDER BY id DESC LIMIT 1
            `, [roomId])
            if(lastMessage.rows.length !== 0){
                return lastMessage.rows[0].content + "   " + lastMessage.rows[0].date
            } else {
                return null
            }
        } catch (e){
            console.log("error in get last message: " + e.message)
        }
    }
}