import {useEffect, useState} from "react";
import {NotificationItem} from "./NotificationItem";
import {useGetNotificationsMutation} from "../../data/store/notifications/NotificationsApi";
import {SingleNotification} from "../../data/models/notifications/NotificationsResult";
import {NotificationsConverter} from "./NotificationsConverter";
import {NotificationTypes} from "../../domain/notification/NotificationType";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../routes/IROBRoutes";
import {useNotificationContext} from "../main/contexts/NotificationModelProvider";


export default function NotificationMainViewModel() {

    const [notifications, setNotifications] = useState<NotificationItem[]>([])
    const [isEmptyVisible, setIsEmptyVisible] = useState(false)

    const notificationContext = useNotificationContext()
    const notificationConverter = new NotificationsConverter()
    const navigate = useNavigate()

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
                            roomId: notification.room_id,
                            type: notificationConverter.convert(notification.type)
                        }
                    })
                    setNotifications(uiNotifications)
                    if (uiNotifications.length === 0) {
                        setIsEmptyVisible(true)
                    }
                }
            })
    }, [])

    const onNotificationClick = (item: NotificationItem) => {
        const roomNavigate = IROBRoutes.rooms + "/" + item.roomId
        if (item.type === NotificationTypes.ADMIN_ADDED) {
            navigate(roomNavigate)
        } else if (item.type === NotificationTypes.AGREEMENTS_ACCEPTED) {
            navigate(roomNavigate)
        } else if (item.type === NotificationTypes.LICENSE_CREATED) {
            navigate(roomNavigate)
        } else if (item.type === NotificationTypes.REQUIREMENT_ACCEPTED) {
            navigate(roomNavigate)
        } else if (item.type === NotificationTypes.LICENSE_CANCELLED) {
            navigate(roomNavigate)
        }
        notificationContext?.setVisibility(false)
    }

    return {
        notifications,
        isEmptyVisible,
        onNotificationClick
    }

}