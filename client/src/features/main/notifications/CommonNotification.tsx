import { NotificationPosition } from "../contexts/NotificationProvider"

export interface TopRightNotificationProps {
    text: string | null
    showTimeMs: number
    position: NotificationPosition
}

export function CommonNotification({ text, showTimeMs, position }: TopRightNotificationProps) {
    let state: string
    if(position === NotificationPosition.CENTER) {
        state = `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 `
    } else {
        state = `top-24 right-14 `
    }
    return <div
        role="alert"
        className={state + "max-w-[340px] w-fit p-4 z-60 h-fit rounded-2xl text-white text-lg border-2 bg-[#0c131a] border-[#ffb81c] absolute"}>
        <p>{text}</p>
    </div>
}