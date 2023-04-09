const db = require("../db");

const NOTIFICATION_TABLE_NAME = "notifications"

const userController = require("./UserController");
const NotificationTypes = require("../routes/notification/notificationTypes");

module.exports = {
    getAllNotifications,
    createNotification,
    deleteNotification
}

async function deleteNotification(id) {
    try {

        await db.query(`
            DELETE FROM ${NOTIFICATION_TABLE_NAME} WHERE id=$1
        `, [id])

    } catch (e) {
        console.log("Error in controller delete notification: " + e.message)
    }
}

async function createNotification(userId, roomId, type) {
    try {

        let message = ""

        const datetime = new Date();
        const date = datetime.toISOString().slice(0, 10)

        if (type === NotificationTypes.REQUIREMENT_ACCEPTED) {
            message = `Your requirement was accepted in room: ${roomId}`
        } else if (type === NotificationTypes.LICENSE_CREATED) {
            message = `Deal was made in room ${roomId}`
        } else if (type === NotificationTypes.LICENSE_CANCELLED) {
            message = `Your license was canceled in room ${roomId}`
        } else if (type === NotificationTypes.ADMIN_ADDED) {
            message = `Congratulations, now you are the second admin in room: ${roomId}, make a deal!`
        }

        await db.query(`
                INSERT INTO ${NOTIFICATION_TABLE_NAME}
                (type, user_id, message, date, room_id, is_watched)
                VALUES ('${type}',${userId}, '${message}', '${date}', '${roomId}', false)
        `)

    } catch (e) {
        console.log("Error in notification creation: " + e.message)
    }
}

async function getAllNotifications(token) {
    try {

        const user = await userController.getUser(token)

        const notifications = await db.query(`
            SELECT * FROM ${NOTIFICATION_TABLE_NAME} WHERE user_id=$1
        `, [user.id])

        return notifications.rows

    } catch (e) {
        console.log("Error in get all notifications: " + e.message)
    }
}