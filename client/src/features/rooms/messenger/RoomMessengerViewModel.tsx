import {useEffect, useState} from "react";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../main/page/RoomViewModel";
import {getMessage, isSendMessageEvent, RoomWebSocketTypes} from "../domain/HandleEventTypes";

export default function RoomMessengerViewModel() {

    const [messageList, addMessage] = useState([] );
    const [singleMessage, setSingleMessage] = useState("")

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isSendMessageEvent
    });

    useEffect(() => {
        if (lastMessage !== null) {
            addMessage((prev) => prev.concat(getMessage(lastMessage)));
        }
    }, [lastMessage, addMessage]);

    const sendMessage = async () => {
        try {
            if (singleMessage !== "") {
                sendJsonMessage({
                    type: RoomWebSocketTypes.sendMessage,
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