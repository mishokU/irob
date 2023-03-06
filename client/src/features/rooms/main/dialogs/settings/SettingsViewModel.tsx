import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useUpdateRoomMutation} from "../../../../../data/store/rooms/RoomsApi";
import {updateRoomName} from "../../../../../data/slices/RoomSlice";
import {SettingsProps} from "./SettingsProps";
import {useSearchUsersByCredentialsMutation} from "../../../../../data/store/search/SearchApi";
import {ProfileResponse} from "../../../../../data/models/common/ProfileResponse";
import {debounce} from "@mui/material";
import {UserSettingsModel} from "./UserSettingsModel";

export default function SettingsViewModel({setIsVisible}: SettingsProps) {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const dispatch = useDispatch()

    const [title, setTitle] = useState(roomReducer.roomName)
    const [search, setSearch] = useState("")
    const [users, setUsers] = useState<UserSettingsModel[]>([])
    const [isDropdownVisible, setDropdown] = useState(false)
    const [userId, setUserId] = useState(0)

    const [updateRoomMutation] = useUpdateRoomMutation()
    const [searchUsersMutation] = useSearchUsersByCredentialsMutation()

    const updateRoomClick = async () => {
        try {
            const payload = await updateRoomMutation({
                roomId: roomReducer.roomId,
                name: title,
                userId: userId,
                ownerId: profileReducer.profileId
            }).unwrap()
            dispatch(updateRoomName(payload))
            setIsVisible(false)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setDropdown(users.length > 0)
    }, [users])

    useEffect(() => {
        if (search !== "") {
            verify(search);
        }
    }, [search]);

    const verify = useCallback(debounce(search => {
        searchUsers(search)
            .catch((e) => console.log(e))
            .then((data: any) => {
                const users = data.users.map((user: ProfileResponse) => {
                    return {
                        username: user.name + " " + user.surname, userId: user.id
                    }
                })
                setUsers(users)
            })
    }, 300), []);

    async function searchUsers(search: string) {
        return await searchUsersMutation({query: search}).unwrap()
    }

    const onUserClick = (user: UserSettingsModel) => {
        setSearch(user.username)
        setUserId(user.userId)
    }

    return {
        title, setTitle, updateRoomClick, search, setSearch, isDropdownVisible, users, onUserClick
    }

}