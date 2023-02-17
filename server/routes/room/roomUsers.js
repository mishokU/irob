const {Router} = require("express");
const roomUserController = require("../../controllers/RoomUsersController");
const userController = require("../../controllers/UserController");
var Promise = require('bluebird');

const roomUsersRouter = new Router()

// export our router to be mounted by the parent application
module.exports = roomUsersRouter

roomUsersRouter.post('/join', (request, result) => {
    return joinUserToRoom(request, result)
})

roomUsersRouter.delete('/leave', (request, result) => {
    return leaveFromRoom(request, result)
})

roomUsersRouter.get('/getUsers/:roomId', (request, result) => {
    return getUsers(request, result)
})

async function getUsers(request, result) {
    try {
        const token = request.get('token')
        const roomId = request.params.roomId;
        const roomUsers = await roomUserController.getRoomUsers(token, roomId)
        console.log("room users ids: " + roomUsers)
        const userModels = await Promise.map(roomUsers, async (roomUser) => {
            return userController.getUserById(roomUser.user_id)
                .catch(e => console.log(e));
        }, {concurrency: 1});

        console.log("users: " + userModels)
        result.status(200).json({
            success: true,
            users: userModels
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Error while get users from room: " + e.message
        })
    }
}

async function joinUserToRoom(request, result) {
    try {
        const token = request.get('token')
        const {roomId} = request.body
        const hasUserInRoom = await roomUserController.hasUser(token, roomId)
        if (!hasUserInRoom) {
            await roomUserController.joinUserToRoom(token, roomId)
        }
        result.status(200).json({
            success: true
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: e.message
        })
    }
}

async function leaveFromRoom(request, result) {
    try {
        const token = request.get('token')
        const roomId = request.params.roomId;
        await roomUserController.leaveFromRoom(token, roomId)
        result.status(200).json({
            success: true,
            message: "User leaved from room"
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: `Error in leave from room: ` + e.message
        })
    }
}