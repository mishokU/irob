import {NotificationItem} from "./NotificationItem";

export interface NotificationItemProps {
    notification: NotificationItem
    isDividerVisible: boolean
    onNotificationClick: (item: NotificationItem) => void
}

export function NotificationItemComponent({notification, isDividerVisible, onNotificationClick}: NotificationItemProps) {
    return <div
        onClick={() => onNotificationClick(notification)}
        className="cursor-pointer">
        <div className="pl-4 pr-4 pt-3 pb-3 bg-transparent hover:bg-gray-800">
            <h1 className="pointer-events-none">{notification.message}</h1>
        </div>
        {isDividerVisible && <div className="w-full h-[2px] bg-[#29303A]"/>}
    </div>
}