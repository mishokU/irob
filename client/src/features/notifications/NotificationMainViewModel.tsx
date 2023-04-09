import {useEffect, useState} from "react";
import {NotificationItem} from "./NotificationItem";
import {useGetNotificationsMutation} from "../../data/store/notifications/NotificationsApi";
import {SingleNotification} from "../../data/models/notifications/NotificationsResult";


export default function NotificationMainViewModel() {

    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [isEmptyVisible, setIsEmptyVisible] = useState(false)

    const [getNotifications] = useGetNotificationsMutation()

    useEffect(() => {
        async function fetchData() {
            return await getNotifications().unwrap()
        }

        fetchData()
            .catch((error) => console.log(error))
            .then((data) => {
                if (data !== undefined) {
                    const uiNotifications = data.notifications.map((notification: SingleNotification) => {
                        return {
                            username: notification.username,
                            userId: notification.userId,
                            message: notification.message,
                            id: notification.id,
                        }
                    })
                    setNotifications(uiNotifications)
                    if(uiNotifications.length === 0){
                        setIsEmptyVisible(true)
                    }
                }
            })
    }, [])

    return {
        notifications,
        isEmptyVisible
    }

}