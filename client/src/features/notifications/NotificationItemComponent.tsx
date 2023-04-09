import {NotificationItem} from "./NotificationItem";

export interface NotificationItemProps {
    notification: NotificationItem
    isDividerVisible: boolean
}

export function NotificationItemComponent({notification, isDividerVisible}: NotificationItemProps) {
    return <div>
        <div className="pl-4 pr-4 pt-2 pb-2 mt-2 bg-transparent hover:bg-gray-800">
            <h1 className="pointer-events-none">{notification.message}</h1>
        </div>
        {
            isDividerVisible && <div className="w-full h-[2px] bg-black"/>
        }
    </div>
}