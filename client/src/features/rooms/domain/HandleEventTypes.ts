import {RoomUserResponse} from "../../../data/models/rooms/users/RoomUserResponse";
import {RoomRequirementModel} from "../../../domain/rooms/RoomRequirementModel";
import {MessageModel, MessageType} from "./MessageModel";

export enum RoomWebSocketTypes {
    sendMessage = 'sendMessage',
    userJoined = 'userJoined',
    createRoom = 'createRoom',
    userDisconnected = 'userDisconnected',
    createRequirement = 'createRequirement',
    applyRequirement = 'applyRequirement',
    declineRequirement = 'declineRequirement'
}

export function getUserFromServer(user: any) {
    const newUser: RoomUserResponse = {
        id: user.profileId, fullName: user.fullName, avatar: user.avatar, isAdmin: user.isAdmin
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
        id: json.data.id, fullName: json.data.username, isAdmin: json.data.isAdmin, avatar: json.data.avatar
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

export function getRequirement(lastMessage: any, userId: number): RoomRequirementModel {
    let data = JSON.parse(lastMessage.data).data
    return {
        username: data.username,
        requirementId: data.requirementId,
        isApplyButtonVisible: data.userId !== userId,
        isAlive: true
    }
}

export function isSendMessageEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.sendMessage || event.type === RoomWebSocketTypes.createRequirement;
}

export function isUserEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.userJoined || event.type === RoomWebSocketTypes.userDisconnected || event.type === RoomWebSocketTypes.createRoom;
}

export function isRequirementEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.createRequirement || event.type === RoomWebSocketTypes.applyRequirement || event.type === RoomWebSocketTypes.declineRequirement
}