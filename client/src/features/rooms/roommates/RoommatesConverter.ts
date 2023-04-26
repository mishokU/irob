import {RoomUserResponse} from "../../../data/models/rooms/users/RoomUserResponse";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png"

export class RoommatesConverter {

    getUserFromServer(user: any) {
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
        const user: RoomUserResponse = {
            id: json.data.id,
            fullName: json.data.username,
            isAdmin: json.data.isAdmin,
            avatar: this.getAvatar(json.data.avatar)
        }
        return user
    }

    getAvatar(avatar: string): string {
        if (avatar === null) {
            return avatarPlaceholder
        } else {
            return avatar
        }
    }

}