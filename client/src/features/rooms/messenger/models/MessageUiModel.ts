import {MessageType} from "../../domain/MessageModel";

export interface MessageUiModel {
    isMyMessage: boolean
    username: string
    avatar: string
    date: string
    content: string
    type: MessageType
    buttons: string[] | null
}