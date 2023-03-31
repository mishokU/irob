import {MessageType} from "../../domain/requests/MessageModel";

export interface MessageUiModel {
    isMyMessage: boolean
    username: string
    avatar: string
    date: string
    content: string
    type: MessageType
    buttons: string[] | null
}