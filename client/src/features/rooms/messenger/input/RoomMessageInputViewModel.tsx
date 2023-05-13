import {isSendMessageEvent, RoomWebSocketTypes} from "../../domain/requests/HandleEventTypes";
import {MessageType} from "../../domain/requests/MessageModel";
import {useState} from "react";
import useWebSocket from "react-use-websocket";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";
import {WS_URL} from "../../../../constants/Constants";

export default function RoomMessageInputViewModel() {

    const [singleMessage, setSingleMessage] = useState("")

    const profileReducer = useSelector((state: RootState) => state.profile)
    const roomReducer = useSelector((state: RootState) => state.room)

    const {sendJsonMessage} = useWebSocket(WS_URL, {
        share: true, filter: isSendMessageEvent
    });

    const sendMessage = async () => {
        try {
            if (singleMessage !== "") {
                sendJsonMessage({
                    type: RoomWebSocketTypes.sendMessage,
                    username: profileReducer.fullName,
                    avatar: profileReducer.avatar,
                    userId: profileReducer.profileId,
                    roomId: roomReducer.roomId,
                    messageType: MessageType.CONTENT,
                    content: singleMessage
                });
                setSingleMessage("")
            }
        } catch (exception) {
            console.log(exception)
        }
    }

    return {
        sendMessage, singleMessage, setSingleMessage
    }

}