import {RoomUserResponse} from "../../../data/models/rooms/users/RoomUserResponse";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png"

export class RoommatesConverter {

    getUserFromServer(user: any) {
        console.log(user)
        const newUser: RoomUserResponse = {
            id: user.profileId,
            fullName: user.fullName,
            avatar: this.getAvatar(user.avatar),
            isAdmin: user.isAdmin
        }
        return newUser
    }

    getUser(lastMessage: any) {
        let json = JSON.parse(lastMessage.data)
        console.log(json)
        const user: RoomUserResponse = {
            id: json.data.id,
            fullName: json.data.username,
            isAdmin: json.data.isAdmin,
            avatar: this.getAvatar(json.data.avatar)
        }
        return user
    }

    getAvatar(avatar: string): string {
        console.log(avatar)
        if (avatar === null) {
            return avatarPlaceholder
        } else {
            return avatar
        }
    }

}