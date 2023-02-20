import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../main/page/RoomViewModel";
import {
    getEventType,
    getMessage, getRequirementMessage,
    isSendMessageEvent,
    RoomWebSocketTypes
} from "../domain/HandleEventTypes";
import {MessageModel} from "../domain/MessageModel";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {MessagesUiConverter} from "./uiConverters/MessagesUiConverter";
import {MessageUiModel} from "./models/MessageUiModel";

export default function RoomMessengerViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)

    const [messageList, setMessages] = useState<MessageUiModel[]>([] );
    const [singleMessage, setSingleMessage] = useState("")

    const messagesUiConverter = new MessagesUiConverter()

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isSendMessageEvent
    });

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getEventType(lastMessage)
            let message: MessageModel | null = null
            if(type === RoomWebSocketTypes.sendMessage){
                message = getMessage(lastMessage)
            } else if (type === RoomWebSocketTypes.createRequirement){
                message = getRequirementMessage(lastMessage)
            }
            console.log("message: " + message)
            if(message !== null){
                const uiMessage = messagesUiConverter.convert(profileReducer.id, message)
                setMessages((prev) => prev.concat(uiMessage))
            }
        }
    }, [lastMessage, setMessages]);

    const sendMessage = async () => {
        try {
            if (singleMessage !== "") {
                sendJsonMessage({
                    type: RoomWebSocketTypes.sendMessage,
                    username: profileReducer.name + " " + profileReducer.surname,
                    avatar: profileReducer.avatar || "test",
                    userId: profileReducer.id,
                    content: singleMessage
                });
                setSingleMessage("")
            }
        } catch (exception) {
            console.log(exception)
        }
    }

    return {
        setSingleMessage, sendMessage, messageList, singleMessage
    }

}