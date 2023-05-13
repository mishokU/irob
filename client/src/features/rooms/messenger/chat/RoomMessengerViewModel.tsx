import {useEffect, useRef, useState} from "react";
import useWebSocket from "react-use-websocket";
import {
    getEventType, getMessage, getRequirementMessage, isSendMessageEvent, RoomWebSocketTypes
} from "../../domain/requests/HandleEventTypes";
import {MessageModel} from "../../domain/requests/MessageModel";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";
import {MessagesUiConverter} from "../uiConverters/MessagesUiConverter";
import {MessageUiModel} from "../models/MessageUiModel";
import {useGetRoomMessagesMutation} from "../../../../data/store/rooms/RoomMessengerApi";
import {RoomMessageResponse} from "../../../../data/models/rooms/messenger/RoomMessagesResponse";
import {WS_URL} from "../../../../constants/Constants";

export enum ScrollType {
    TOP, BOTTOM
}

export default function RoomMessengerViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)
    const roomReducer = useSelector((state: RootState) => state.room)

    const [messageList, setMessages] = useState<MessageUiModel[]>([]);
    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(0)
    const offsetStep = 15

    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const scrollTopElement = (event: Event) => {
        const {currentTarget: target} = event;
        const element = target as HTMLDivElement
        const height = element.scrollHeight / 10
        element?.scroll({top: height});
    }

    const scrollToBottom = () => {
        messagesEndRef?.current?.addEventListener('DOMNodeInserted', event => {
            const {currentTarget: target} = event;
            const element = target as HTMLDivElement
            element?.scroll({top: element.scrollHeight});
        });
    }

    const scrollToTop = () => {
        messagesEndRef?.current?.addEventListener('DOMNodeInserted', scrollTopElement);
    }

    const onScroll = () => {
        if (messagesEndRef.current) {
            const {scrollTop} = messagesEndRef.current;
            if (scrollTop === 0) {
                if (offset < limit) {
                    loadMessages(ScrollType.TOP)
                }
            }
        }
    };

    const [getRoomMessagesMutation] = useGetRoomMessagesMutation()

    const messagesUiConverter = new MessagesUiConverter()

    const {lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isSendMessageEvent
    });

    useEffect(() => {
        loadMessages(ScrollType.BOTTOM)
    }, [])

    function loadMessages(scrollType: ScrollType) {
        async function getPagedMessages() {
            return await getRoomMessagesMutation({
                roomId: roomReducer.roomId, offset: offset
            }).unwrap()
        }

        getPagedMessages()
            .catch((e) => console.log(e))
            .then((data: any) => {
                setLimit(data.limit)
                return data.messages.map((message: RoomMessageResponse) => {
                    return messagesUiConverter.convertServerModel(profileReducer.profileId, message)
                })
            })
            .then((uiMessages: MessageUiModel[]) => {
                const newMessages = uiMessages.concat(messageList)
                setMessages(newMessages)
                setOffset(offset + offsetStep)
                if (scrollType === ScrollType.BOTTOM) {
                    scrollToBottom()
                } else if (scrollType === ScrollType.TOP) {
                    scrollToTop()
                }
            })
    }

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getEventType(lastMessage)
            let message: MessageModel | null = null
            if (type === RoomWebSocketTypes.sendMessage) {
                message = getMessage(lastMessage)
            } else if (type === RoomWebSocketTypes.createRequirement) {
                message = getRequirementMessage(lastMessage)
            }
            if (message !== null) {
                const uiMessage = messagesUiConverter.convert(profileReducer.profileId, message)
                setMessages((prev) => prev.concat(uiMessage))
            }
            messagesEndRef?.current?.removeEventListener('DOMNodeInserted', scrollTopElement)
            scrollToBottom()
        }
        return;
    }, [lastMessage]);

    return {
        messageList, messagesEndRef, onScroll
    }

}