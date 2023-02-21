import {MessageProps} from "./MessageProps";

export function SimpleMessageComponent({message}: MessageProps) {
    const myMessageStyle = "rounded-md text-white min-h-[40px] h-fit justify-center items-center pl-4 pr-4 pt-2 pb-2 w-fit max-w-[1000px] break-all"
    const otherMessageStyle = "rounded-md text-white min-h-[40px] h-fit justify-center items-center pl-4 pr-4 pt-2 pb-2 w-fit max-w-[1000px] break-all ml-auto"
    return <div
        className={message.isMyMessage ? myMessageStyle : otherMessageStyle}>
        <div className="flex space-x-4">
            {message.isMyMessage && <img className="min-w-[36px] w-[36px] h-[36px] bg-white rounded-full" />}
            <div>
                <div className="flex space-x-2 items-center">
                    <h2 className="text-yellow-300">{message.username}</h2>
                    <p className="text-sm text-gray-400">{message.date}</p>
                </div>
                <p className={message.isMyMessage ? "" : "text-end"}>{message.content}</p>
            </div>
            {!message.isMyMessage && <img
                className="min-w-[36px] w-[36px] h-[36px] bg-white rounded-full"
                src={message.avatar}
            />}
        </div>
    </div>
}