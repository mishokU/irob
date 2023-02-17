import useWebSocket from "react-use-websocket";
import {WS_URL} from "../main/page/RoomViewModel";
import {
    getUser, getUserEventType, getUserFromServer, isUserEvent, RoomWebSocketTypes
} from "../domain/HandleEventTypes";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {RoomUserResponse} from "../../../data/rooms/users/RoomUserResponse";
import {useGetRoomUsersMutation} from "../../../data/store/rooms/RoomUsersApi";

export default function RoommatesViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [users, addUser] = useState<RoomUserResponse[]>([]);

    const [userRoomMutation] = useGetRoomUsersMutation()

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isUserEvent
    });

    useEffect(() => {

        async function fetchData() {
            return await userRoomMutation(roomReducer.roomId).unwrap()
        }

        fetchData().catch((error) => {
            return error
        }).then(data => {
            if (data.length > 0) {
                data.map((user: any) => joinUser(getUserFromServer(user)))
            }
        });

    }, [userRoomMutation, roomReducer.roomId])

    useEffect(() => {
        sendJsonMessage({
            type: RoomWebSocketTypes.userJoined,
            username: profileReducer.fullName,
            roomId: roomReducer.roomId,
            userId: profileReducer.id
        });
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getUserEventType(lastMessage)
            if (type === RoomWebSocketTypes.userJoined) {
                joinUser(getUser(lastMessage))
            } else {
                removeUser(getUser(lastMessage))
            }
        }
    }, [lastMessage, addUser]);

    function joinUser(user: RoomUserResponse) {
        addUser((prev) => prev.concat(user));
    }

    function removeUser(user: RoomUserResponse) {
        console.log("user id: " + user.id)
        const newUsers = users.filter((item: RoomUserResponse) => item.id !== user.id)
        addUser(newUsers);
    }

    return {
        users
    }

}