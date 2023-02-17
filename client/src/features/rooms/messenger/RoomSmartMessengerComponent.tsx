import {ReactComponent as SendMessageIcon} from "../asserts/icon_send_message.svg";
import requirementsImg from "../asserts/battle_48px.png"
import useViewModel from "./RoomMessengerViewModel";
import {useEffect, useRef} from "react";
import {RoomMessengerProps} from "./RoomMessengerProps";

export function RoomSmartMessengerComponent({isVisible, setIsVisible, roomName}: RoomMessengerProps) {

    const {setSingleMessage, sendMessage, messageList, singleMessage} = useViewModel()
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"})
    }

    useEffect(() => {
        scrollToBottom()
    }, [messageList]);

    return <div className="w-full">
        <div className="text-white text-2xl">Smart messenger of {roomName}</div>
        <div className="border-2 border-[#29303A] rounded-lg mt-4 p-4 w-full h-[700px] overflow-y-scroll
            scrollbar scrollbar-thumb-gray-800 scrollbar-track-gray-100
        scroll-auto space-y-4"
             ref={messagesEndRef}>
            {messageList.map((item) => (<div
                key={(Math.random() + 1).toString(36).substring(7)}
                className="rounded-md text-white min-h-[40px] h-fit justify-center items-center p-4 w-fit max-w-[1000px] break-all">
                <div className="flex space-x-4">
                    <img className="min-w-[36px] w-[36px] h-[36px] bg-white rounded-full"/>
                    <div>
                        <div className="flex space-x-2 items-center">
                            <h2 className="text-yellow-300">Misha Usov</h2>
                            <p className="text-sm text-gray-400">03.12.1999</p>
                        </div>
                        <p>{item}</p>
                    </div>
                </div>
            </div>))}
        </div>
        <div className="flex w-full items-center mt-4 justify-center">
            <div className="border-2 border-white rounded-lg w-full h-[50px] flex mt-auto mb-auto">
                <input
                    className="w-full pl-4 outline-none bg-transparent text-white"
                    placeholder="Write your message"
                    value={singleMessage}
                    ref={input => input && input.focus()}
                    onKeyDown={event => {
                        if (event.key === 'Enter') {
                            sendMessage()
                        }
                    }}
                    onChange={messageField => setSingleMessage(messageField.target.value)}
                />
            </div>
            <div
                className="border-2 ml-2 rounded-lg h-[50px] w-[50px] cursor-pointer m-auto block pt-1 pl-1"
                onClick={sendMessage}>
                <SendMessageIcon />
            </div>
            <div
                className="border-2 ml-2 rounded-lg h-[50px] w-[50px] m-auto block cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}>
                <img src={requirementsImg} />
            </div>
        </div>
    </div>
}