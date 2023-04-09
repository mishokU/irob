export interface NotificationsResult {
    notifications: SingleNotification[]
}

export interface SingleNotification {
    username: string
    userId: number
    id: number
    message: string
}