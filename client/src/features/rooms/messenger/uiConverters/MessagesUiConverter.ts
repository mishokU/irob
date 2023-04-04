import {MessageModel, MessageType} from "../../domain/requests/MessageModel";
import {MessageUiModel} from "../models/MessageUiModel";
import {RoomMessageResponse} from "../../../../data/models/rooms/messenger/RoomMessagesResponse";
import avatarPlaceholder from "../../../../ui/assets/avatart_placeholder.png"

export class MessagesUiConverter {

    convert(userId: number, messageModel: MessageModel): MessageUiModel {
        return {
            id: messageModel.id,
            isMyMessage: userId === messageModel.userId,
            date: messageModel.date,
            content: messageModel.content,
            username: messageModel.username,
            avatar: this.getAvatar(messageModel.avatar),
            buttons: messageModel.buttons,
            type: messageModel.type
        }
    }

    convertServerModel(userId: number, message: RoomMessageResponse): MessageUiModel {
        return {
            id: message.id,
            isMyMessage: userId === message.user_id,
            date: message.date,
            content: message.content,
            username: message.username,
            avatar: this.getAvatar(message.avatar),
            buttons: null,
            type: this.getMessageType(message.type)
        }
    }

    getMessageType(type: number): MessageType {
        let messageType: MessageType
        if (type === 0) {
            messageType = MessageType.CONTENT
        } else {
            messageType = MessageType.CREATE_REQUIREMENT
        }
        return messageType
    }

    getAvatar(avatar: string): string {
        console.log(avatar)
        if (avatar) {
            return avatar
        } else {
            return avatarPlaceholder
        }
    }

}