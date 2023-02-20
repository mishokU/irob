import {MessageModel} from "../../domain/MessageModel";
import {MessageUiModel} from "../models/MessageUiModel";

export class MessagesUiConverter {

    convert(userId: number, messageModel: MessageModel): MessageUiModel {
        return {
            isMyMessage: userId === messageModel.userId,
            date: messageModel.date,
            content: messageModel.content,
            username: messageModel.username,
            avatar: messageModel.avatar,
            buttons: messageModel.buttons,
            type: messageModel.type
        }
    }
}