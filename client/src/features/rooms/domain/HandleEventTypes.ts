import {RoomUserResponse} from "../../../data/rooms/users/RoomUserResponse";
import {RoomRequirementModel} from "../../../domain/rooms/RoomRequirementModel";
import {MessageModel, MessageType} from "./MessageModel";

export enum RoomWebSocketTypes {
    sendMessage = 'sendMessage',
    userJoined = 'userJoined',
    userDisconnected = 'userDisconnected',
    createRequirement = 'createRequirement',
    applyRequirement = 'applyRequirement',
    declineRequirement = 'declineRequirement'
}

export function getUserFromServer(user: any) {
    const newUser: RoomUserResponse = {
        id: user.id, fullName: user.name + " " + user.surname, isAdmin: false
    }
    return newUser
}

export function getEventType(lastMessage: any) {
    let json = JSON.parse(lastMessage.data)
    return json.type
}

export function getUser(lastMessage: any) {
    let json = JSON.parse(lastMessage.data)
    const user: RoomUserResponse = {
        id: json.data.id, fullName: json.data.username, isAdmin: json.data.isAdmin
    }
    return user
}

export function getMessage(lastMessage: any): MessageModel {
    let json = JSON.parse(lastMessage.data)
    return createMessageModel(json.data, MessageType.CONTENT)
}

export function getRequirementMessage(lastMessage: any): MessageModel {
    let json = JSON.parse(lastMessage.data)
    return createMessageModel(json.data, MessageType.CREATE_REQUIREMENT)
}

function createMessageModel(data: any, type: MessageType): MessageModel {
    console.log("data: " + data)
    return {
        userId: data.userId,
        date: data.date,
        username: data.username,
        avatar: data.avatar,
        type: type,
        content: data.content,
        buttons: ["Apply", "Decline"]
    }
}

export function getRequirement(lastMessage: any): RoomRequirementModel {
    let data = JSON.parse(lastMessage.data).data
    return {
        username: data.username, requirementId: data.requirementId, isApplyButtonVisible: true
    }
}

export function isSendMessageEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.sendMessage || event.type === RoomWebSocketTypes.createRequirement;
}

export function isUserEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.userJoined || event.type === RoomWebSocketTypes.userDisconnected;
}

export function isRequirementEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.createRequirement || event.type === RoomWebSocketTypes.applyRequirement || event.type === RoomWebSocketTypes.declineRequirement
}