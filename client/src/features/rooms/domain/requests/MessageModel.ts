export enum MessageType {
    CONTENT,
    CREATE_REQUIREMENT
}

export interface MessageModel {
    userId: number
    username: string
    avatar: string
    date: string
    content: string
    type: MessageType
    buttons: string[] | null
}