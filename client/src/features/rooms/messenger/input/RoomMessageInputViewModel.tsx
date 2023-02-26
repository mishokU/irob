import {isSendMessageEvent, RoomWebSocketTypes} from "../../domain/HandleEventTypes";
import {MessageType} from "../../domain/MessageModel";
import {useState} from "react";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../main/page/RoomViewModel";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";

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
                    username: profileReducer.name + " " + profileReducer.surname,
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