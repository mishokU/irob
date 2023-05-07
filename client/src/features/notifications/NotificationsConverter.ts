import {NotificationTypes} from "../../domain/notification/NotificationType";


export class NotificationsConverter {

    convert(type: string): NotificationTypes | null {
        if (type === NotificationTypes.LICENSE_CREATED.toString()) {
            return NotificationTypes.LICENSE_CREATED
        } else if (type === NotificationTypes.LICENSE_CANCELLED.toString()) {
            return NotificationTypes.LICENSE_CANCELLED
        } else if (type === NotificationTypes.AGREEMENTS_ACCEPTED.toString()) {
            return NotificationTypes.AGREEMENTS_ACCEPTED
        } else if (type === NotificationTypes.ADMIN_ADDED.toString()) {
            return NotificationTypes.ADMIN_ADDED
        } else if (type === NotificationTypes.REQUIREMENT_ACCEPTED.toString()) {
            return NotificationTypes.REQUIREMENT_ACCEPTED
        } else {
            return null
        }
    }

}