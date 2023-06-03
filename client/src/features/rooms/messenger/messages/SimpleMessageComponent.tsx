import {MessageProps} from "./MessageProps";
import avatarPlaceholder from "../../../../ui/assets/avatart_placeholder.png"

export function SimpleMessageComponent({message}: MessageProps) {
    const myMessageStyle = "rounded-md text-white min-h-[40px] h-fit justify-center items-center lg:pl-4 lg:pr-4 pt-2 pb-2 w-fit max-w-[1000px] break-all"
    const otherMessageStyle = "rounded-md text-white min-h-[40px] h-fit justify-center items-center lg:pl-4 lg:pr-4 pt-2 pb-2 w-fit max-w-[1000px] break-all ml-auto"
    return <div
        key={message.id}
        className={message.isMyMessage ? myMessageStyle : otherMessageStyle}>
        <div className="flex space-x-4">
            {message.isMyMessage && <img
                alt="avatar"
                src={message.avatar}
                placeholder={avatarPlaceholder}
                className="min-w-[36px] object-cover w-[36px] h-[36px] bg-white rounded-full"/>}
            <div>
                <div
                    className={message.isMyMessage ? "flex space-x-2 items-center" : "flex space-x-2 items-center justify-end text-end"}>
                    <h2 className="text-yellow-300">{message.username}</h2>
                    <p className="text-sm text-gray-400">{message.date}</p>
                </div>
                <p className={message.isMyMessage ? "" : "text-end"}>{message.content}</p>
            </div>
            {!message.isMyMessage && <img
                src={message.avatar}
                alt="avatar"
                placeholder={avatarPlaceholder}
                className="min-w-[36px] w-[36px] h-[36px] object-cover bg-white rounded-full"
            />}
        </div>
    </div>
}