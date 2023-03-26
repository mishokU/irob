const {Router} = require("express");
const roomUserController = require("../../controllers/RoomUsersController");
const userController = require("../../controllers/UserController");
const roomController = require("../../controllers/RoomControllers")
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
        const room = await roomController.getRoom(roomId)
        const userModels = await Promise.map(roomUsers, async (roomUser) => {
            const user = await userController.getUserById(roomUser.user_id).catch(e => console.log(e));
            return {
                profileId: user.id,
                fullName: user.name + " " + user.surname,
                avatar: user.avatar,
                isAdmin: user.id === room.owner_id || user.id === room.user_id
            }
        }, {concurrency: 1});

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