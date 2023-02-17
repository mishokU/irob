import {RoomUserResponse} from "../../../data/rooms/users/RoomUserResponse";

export enum RoomWebSocketTypes {
    sendMessage= 'sendMessage',
    userJoined = 'userJoined',
    userDisconnected = 'userDisconnected'
}

export function getUserFromServer(user: any){
    const newUser : RoomUserResponse = {
        id: user.id,
        fullName: user.name + " " + user.surname,
        isAdmin: false
    }
    return newUser
}

export function getUserEventType(lastMessage: any){
    let json = JSON.parse(lastMessage.data)
    return json.type
}

export function getUser(lastMessage: any){
    let json = JSON.parse(lastMessage.data)
    console.log("user: " + json.data.username)
    const user : RoomUserResponse = {
            id: json.data.id,
            fullName: json.data.username,
            isAdmin: json.data.isAdmin
    }
    return user
}

export function getMessage(lastMessage: any){
    console.log(lastMessage)
    let json = JSON.parse(lastMessage.data)
    return json.data.editorContent
}

export function isSendMessageEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.sendMessage;
}

export function isUserEvent(message: any) {
    let event = JSON.parse(message.data);
    return event.type === RoomWebSocketTypes.userJoined || event.type === RoomWebSocketTypes.userDisconnected;
}