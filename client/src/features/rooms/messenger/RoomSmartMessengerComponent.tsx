import {ReactComponent as SendMessageIcon} from "../asserts/icon_send_message.svg";
import requirementsImg from "../asserts/battle_48px.png"
import useViewModel from "./RoomMessengerViewModel";
import {useEffect, useRef} from "react";
import {RoomMessengerProps} from "./RoomMessengerProps";
import {MessageModel, MessageType} from "../domain/MessageModel";
import {SimpleMessageComponent} from "./messages/SimpleMessageComponent";
import {RequirementMessageComponent} from "./messages/RequirementMessageComponent";
import {MessageUiModel} from "./models/MessageUiModel";

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
        <div
            className="border-2 border-[#29303A] rounded-lg mt-4 p-4 w-full h-[700px] overflow-y-scroll
            scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100 scroll-auto"
            ref={messagesEndRef}>
            {messageList.map((item: MessageUiModel) => ((item.type === MessageType.CONTENT &&
                    <SimpleMessageComponent message={item} />) || (item.type === MessageType.CREATE_REQUIREMENT &&
                    <RequirementMessageComponent message={item} />)))}
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