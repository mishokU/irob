import {NotificationTypes} from "../../domain/notification/NotificationType";

export interface NotificationItem {
    username: string
    userId: number
    id: number
    message: string
    roomId: string
    type: NotificationTypes | null
}