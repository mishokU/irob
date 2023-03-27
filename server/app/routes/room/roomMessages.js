const {Router} = require("express");

const roomMessagesController = require("../../controllers/RoomMessagesController")
const roomMessagesRouter = new Router()

module.exports = roomMessagesRouter

roomMessagesRouter.get('/getMessages', (request, result) => {
    return getRoomMessages(request, result)
})

roomMessagesRouter.post('/create', (request, result) => {
    return createMessage(request, result)
})

async function createMessage(request, result) {
    try {
        const {
            roomId, userId, content,
            date, avatar, messageType, username
        } = request.body
        await roomMessagesController.addRoomMessage(
            roomId,
            userId,
            content,
            date,
            avatar,
            messageType,
            username
        )
        result.status(200).json({
            success: true
        })
    } catch (e) {
        const message = "Error in create message: " + e.message
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getRoomMessages(request, result) {
    try {

        const roomId = request.query.roomId
        const offset = request.query.offset

        const limit = await roomMessagesController.getRoomMessagesCount(roomId)
        const data = await roomMessagesController.getRoomMessages(roomId, 15, offset)

        const newOffset = Number(offset) + 15

        result.status(200).json({
            success: true,
            messages: data,
            limit: limit,
            offset: newOffset
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Get room messages error: " + e.message
        })
    }
}