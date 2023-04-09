const {Router} = require("express");

const notificationsController = require("../../controllers/NotificationsController")

const notificationsRouter = new Router()

// export our router to be mounted by the parent application
module.exports = notificationsRouter

notificationsRouter.post('/create', (request, result) => {
    return createNotification(request, result)
})

notificationsRouter.delete('/delete', (request, result) => {
    return deleteNotification(request, result)
})

notificationsRouter.get('/all', (request, result) => {
    return getAll(request, result)
})

async function getAll(request, result) {
    try {

        const token = request.get('token')

        const notifications = await notificationsController.getAllNotifications(token)

        result.status(200).json({
            success: true,
            notifications: notifications
        })

    } catch (e) {
        const message = "Error in get all notifications: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function deleteNotification(request, result) {
    try {

        const notificationId = request.query.id

        await notificationsController.deleteNotification(notificationId)

        result.status(500).json({
            success: true
        })

    } catch (e) {
        const message = "Error in notification deleting: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}

async function createNotification(request, result) {
    try {

        const { roomId, type, userId } = request.body

        await notificationsController.createNotification(userId, roomId, type)

        result.status(200).json({
            success: true
        })

    } catch (e) {
        const message = "Error in notification creating: " + e.message
        console.log(message)
        result.status(500).json({
            success: false,
            message: message
        })
    }
}