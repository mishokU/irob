import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useUpdateRoomMutation} from "../../../../../data/store/rooms/RoomsApi";
import {updateRoomName} from "../../../../../data/slices/RoomSlice";
import {SettingsProps} from "./SettingsProps";

export default function SettingsViewModel({setIsVisible}: SettingsProps) {

    const roomReducer = useSelector((state: RootState) => state.room)
    const dispatch = useDispatch()

    const [title, setTitle] = useState(roomReducer.roomName)

    const [updateRoomMutation] = useUpdateRoomMutation()

    const updateRoomClick = async () => {
        try {
            const payload = await updateRoomMutation({roomId: roomReducer.roomId, name: title}).unwrap()
            dispatch(updateRoomName(payload))
            setIsVisible(false)
        } catch (e) {
            console.log(e)
        }
    }

    return {
        title, setTitle, updateRoomClick
    }

}