import {MessageType} from "../../domain/requests/MessageModel";

export interface MessageUiModel {
    id: number
    isMyMessage: boolean
    username: string
    avatar: string
    date: string
    content: string
    type: MessageType
    buttons: string[] | null
}