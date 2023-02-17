import {useEffect, useState} from "react";
import {useGetRoomsMutation} from "../../../data/store/rooms/RoomsApi";
import {RoomResponse} from "../../../data/rooms/RoomResponse";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";
import {useDispatch} from "react-redux";
import {updateRoomId} from "../../../data/slices/RoomSlice";

export default function RoomsProfileViewModel() {

    const [rooms, setRooms] = useState<string[]>([]);

    const [getRoomsMutation] = useGetRoomsMutation()

    const navigate = useNavigate()
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchData() {
            return await getRoomsMutation().unwrap()
        }

        fetchData()
            .catch(e => console.log("load rooms error: " + e))
            .then(data => {
                if (data !== undefined) {
                    data.map((room: RoomResponse) => setRooms((prev) => prev.concat(room.room_id)))
                }
            });
    }, [getRoomsMutation])

    const handleOpenRoom = (roomId: string) => {
        dispatch(updateRoomId(roomId))
        navigate(IROBRoutes.rooms + "/" + roomId)
    }

    return {
        rooms, handleOpenRoom
    }

}