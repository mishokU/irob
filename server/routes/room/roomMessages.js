const {Router} = require("express");

const roomMessagesController = require("../../controllers/RoomMessagesController")
const roomMessagesRouter = new Router()

// export our router to be mounted by the parent application
module.exports = roomMessagesRouter

roomMessagesRouter.get('/getMessages', (request, result) => {
    return getRoomMessages(request, result)
})

roomMessagesRouter.post('/create', (request, result) => {
    return getRoomMessages(request, result)
})

async function getRoomMessages(request, result){
    try {

        const roomId = request.query.roomId
        const offset = request.query.offset

        const limit = await roomMessagesController.getRoomMessagesCount(roomId)
        const data = await roomMessagesController.getRoomMessages(roomId, 15, offset)

        console.log("limit: " + limit)
        const newOffset = Number(offset) + 15

        result.status(200).json({
            success: true,
            messages: data,
            limit: limit,
            offset: newOffset
        })
    } catch (e){
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Get room messages error: " + e.message
        })
    }
}

async function createRoomMessage(request, result){
    try {

    } catch (e){
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Create room message error: " + e.message
        })
    }
}