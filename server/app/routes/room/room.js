const db = require("../../db");
const {Router} = require("express");

const userController = require("../../controllers/UserController");
const roomController = require("../../controllers/RoomControllers")
const roomMessagesController = require("../../controllers/RoomMessagesController")
const roomRequirementsController = require("../../controllers/RoomRequirementsController")
const notificationsController = require("../../controllers/NotificationsController")
const contentController = require("../../controllers/ContentController")

const NotificationTypes = require("../notification/notificationTypes");

const Promise = require("bluebird");
const {getUsername, getToken} = require("../../controllers/Utils");

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

roomRouter.post('/agreement', (request, result) => {
    return agreementRoom(request, result)
})

roomRouter.get('/isRoomAdmin', (request, result) => {
    return isRoomAdmin(request, result)
})

roomRouter.post('/updateFirstAgreement', (request, result) => {
    return updateFirstAgreement(request, result)
})

roomRouter.post('/updateSecondAgreement', (request, result) => {
    return updateSecondAgreement(request, result)
})

roomRouter.get('/getContentId', (request, result) => {
    return getContentId(request, result)
})

async function getContentId(request, result) {
    try {

        const roomId = request.query.roomId;

        const contentId = await roomController.getContentId(roomId)

        if(contentId !== 0){
            result.status(200).json({
                success: true,
                contentId: contentId
            })
        } else {
            result.status(200).json({success: false})
        }

    } catch (e){
        const message = "Error in get content id: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateSecondAgreement(request, result) {
    try {

        const {roomId, isAgreed} = request.body

        await roomController.updateSecondAgreement(roomId, isAgreed)

        result.status(200).json({
            success: true
        })

    } catch (e) {
        const message = "Error in update second agreement: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function updateFirstAgreement(request, result) {
    try {

        const {roomId, isAgreed} = request.body

        await roomController.updateFirstAgreement(roomId, isAgreed)

        result.status(200).json({
            success: true
        })

    } catch (e) {
        const message = "Error in update first agreement: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function isRoomAdmin(request, result) {
    try {

        const roomId = request.query.roomId;
        const userId = request.query.userId;

        const isAdmin = await roomController.isRoomAdmin(userId, roomId)

        result.status(200).json({
            success: true,
            isAdmin: isAdmin
        })

    } catch (e) {
        const message = "Error in is room admin: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

/*
   Type 0 - first agreement means owner of the room
   Type 1 - second side user
*/

async function agreementRoom(request, result) {
    try {
        const {roomId, userId, isAgreed} = request.body
        const room = await roomController.getRoom(roomId)
        let newAgreed = !isAgreed
        if (room.owner_id === userId) {
            await roomController.updateFirstAgreement(roomId, newAgreed)
            result.status(200).json({
                success: true,
                type: 0,
                isAgreed: newAgreed
            })
        } else if (room.user_id === userId) {
            await roomController.updateSecondAgreement(roomId, newAgreed)
            result.status(200).json({
                success: true,
                type: 1,
                isAgreed: newAgreed
            })
        } else {
            result.status(400).json({
                success: false,
                message: "Make agreement can only admins"
            })
        }
    } catch (e) {
        console.log(e)
        result.status(500).json({
            success: false,
            message: "Agreement error"
        })
    }
}

async function updateRoom(request, result) {
    try {
        const {roomId, name, ownerId, userId} = request.body
        if (ownerId !== userId) {
            if (userId !== -1) {
                await roomController.updateRoomWithUser(roomId, name, userId)
                await notificationsController.createNotification(userId, roomId, NotificationTypes.ADMIN_ADDED)
            } else {
                await roomController.updateRoomWithoutUser(roomId, name)
            }
            result.status(200).json({
                success: true,
                name: name,
                userId: userId,
                message: "Room updated"
            })
        } else {
            result.status(400).json({
                success: false
            })
        }
    } catch (e) {
        console.log(e.message)
        result.status(500).json({
            success: false,
            message: "Update room error"
        })
    }
}

async function createRoom(request, result) {
    try {

        const token = getToken(request)
        const {roomId, title, userId, contentId} = request.body;

        let newTitle = ""
        if(title === ""){
            newTitle = "Untitled"
        } else {
            newTitle = title
        }

        await roomController.createRoom(roomId, newTitle, userId, contentId, token)

        if(contentId){
            await contentController.createStartRequirements(roomId, contentId, userId)
        }

        result.status(200).json({
            success: true,
            roomId: roomId,
            roomName: title,

        })

    } catch (e) {
        const message = "Error in create room: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteRoom(request, result) {
    try {
        const token = getToken(request)
        const roomId = request.query.roomId;

        const user = await userController.getUser(token)
        const room = await roomController.getRoom(roomId)

        if (room.owner_id === user.id) {
            await db.query(`DELETE FROM rooms WHERE room_id = $1;`, [roomId])
            //await db.query(`DELETE FROM room_requirements WHERE room_id = $1;`, [roomId])
            await db.query(`DELETE FROM room_messages WHERE room_id = $1;`, [roomId])
            result.status(200).json({
                success: true,
                message: "Room deleted"
            })
        } else {
            result.status(200).json({
                success: false,
                message: "Only owner can delete room!"
            })
        }
    } catch (e) {
        const message = "Error in delete room: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function getRoom(request, result) {
    try {

        const token = getToken(request)
        const roomId = request.params.roomId;

        const user = await userController.getUser(token)
        const roomRes = await db.query(`SELECT * FROM rooms WHERE room_id = $1;`, [roomId])

        const room = roomRes.rows[0]
        const isAdmin = room.owner_id === user.id || room.user_id === user.id

        result.status(200).json({
            roomId: room.room_id,
            isAdmin: isAdmin,
            ownerId: room.owner_id,
            firstAgreement: room.first_agreement,
            type: room.type,
            owner: room.owner,
            contentId: room.content_id,
            secondAgreement: room.second_agreement,
            userId: room.user_id,
            roomName: room.name
        })
    } catch (e) {
        console.log(e)
        result.status(500).json({
            message: "Sm went wrong in getRoom: " + e.message
        })
    }
}

async function getRooms(request, result) {
    try {

        console.log(JSON.stringify(request.headers));

        const token = getToken(request)

        console.log("token")
        console.log(token)

        const user = await userController.getUser(token)

        const rooms = await db.query(`SELECT * FROM rooms WHERE owner_id = $1 OR user_id = $1`, [user.id])

        const fullRooms = await Promise.map(rooms.rows, async (room) => {

            const ownerUser = await userController.getUserById(room.owner_id)
            const fullName = getUsername(ownerUser)

            const isActive = room.first_agreement === true && room.second_agreement === true
            const title = room.name || room.room_id

            const lastMessage = await roomMessagesController.getLastMessage(room.room_id)
            const requirements = await roomRequirementsController.getRoomRequirements(room.room_id)

            return {
                isActive: !isActive,
                title: title,
                ownerName: fullName,
                lastMessage: lastMessage,
                roomId: room.room_id,
                requirements: requirements.length || 0
            }
        }, {concurrency: 2})

        result.status(200).json({
            status: true,
            rooms: fullRooms
        })
    } catch (e) {
        const message = "Something went wrong in getting rooms: " + e.message
        console.log(message)
        result.status(500).json({
            status: false,
            message: message
        })
    }
}