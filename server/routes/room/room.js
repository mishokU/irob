const db = require("../../db");
const {Router} = require("express");
const userController = require("../../controllers/UserController");
const roomController = require("../../controllers/RoomControllers")

const webServer = require("../../webSocket/webServer");

const roomRouter = new Router()

// export our router to be mounted by the parent application
module.exports = roomRouter

roomRouter.post('/create', (request, result) => {
    return createRoom(request, result)
})

roomRouter.delete('/delete', (request, result) => {
    return deleteRoom(request, result)
})

roomRouter.get('/get/:roomId', (request, result) => {
    return getRoom(request, result)
})

roomRouter.get('/getRooms', (request, result) => {
    return getRooms(request, result)
})

roomRouter.post('/update', (request, result) => {
    return updateRoom(request, result)
})

async function updateRoom(request, result) {
    try {
        const {roomId, name} = request.body
        await roomController.updateRoomName(roomId, name)
        result.status(200).json({
            success: true,
            name: name,
            message: "Room updated"
        })
    } catch (e){
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Update room error"
        })
    }
}

async function createRoom(request, result) {
    try {
        const token = request.get('token')
        const { roomId, roomName } = request.body;
        const user = await userController.getUser(token)
        await db.query(`INSERT INTO rooms (room_id, owner_id, name) VALUES ('${roomId}', '${user.id}', '${roomName}')`)
        result.status(200).json({
            success: true,
            roomId: roomId,
            roomName: roomName
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Sm went wrong"
        })
    }
}

async function deleteRoom(request, result) {
    try {
        const token = request.get('token')
        const roomId = request.query.roomId;
        const user = await userController.getUser(token)
        const roomRes = await db.query(`SELECT * FROM rooms WHERE room_id= $1;`, [roomId])
        const room = roomRes.rows[0]
        if (room.owner_id === user.id) {
            await db.query(`DELETE FROM rooms WHERE room_id= $1;`, [roomId])
            result.status(200).json({
                success: true,
                message: "Room deleted"
            })
        } else {
            result.status(400).json({
                message: "Only owner can delete room!"
            })
        }
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: "Sm went wrong in getRoom"
        })
    }
}

async function getRoom(request, result) {
    try {
        const token = request.get('token')
        console.log("token: " + token);
        const roomId = request.params.roomId;
        const user = await userController.getUser(token)
        const roomRes = await db.query(`SELECT * FROM rooms WHERE room_id= $1;`, [roomId])
        const room = roomRes.rows[0]
        const isAdmin = room.owner_id === user.id
        result.status(200).json({
            roomId: room.room_id,
            isAdmin: isAdmin,
            roomName: room.name
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: "Sm went wrong in getRoom"
        })
    }
}

async function getRooms(request, result) {
    try {
        const token = request.get('token')
        const user = await userController.getUser(token)
        //WHERE owner_id= $1;
        const rooms = await db.query(`SELECT * FROM rooms `)
        result.status(200).json({
            rooms: rooms.rows
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: "Sm went wrong in getRooms"
        })
    }
}