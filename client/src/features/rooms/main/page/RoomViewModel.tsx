import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearRoom, updateRoom, updateRoomId} from "../../../../data/slices/RoomSlice";
import {useDeleteRoomMutation, useGetRoomMutation} from "../../../../data/store/rooms/RoomsApi";
import {RootState} from "../../../../data/store";
import {useNavigate} from "react-router-dom";
import useWebSocket from "react-use-websocket";
import {IROBRoutes} from "../../../../routes/IROBRoutes";
import {isLogged} from "../../../../domain/checkers/Checkers";
import {useRemoveUserMutation} from "../../../../data/store/rooms/RoomUsersApi";

export const WS_URL = 'ws://127.0.0.1:8000';

export default function RoomViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [isContentVisible, setIsContentVisible] = useState(false)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const [isRequirementsDialogVisible, setIsRequirementsDialogVisible] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [roomMutation] = useGetRoomMutation()
    const [deleteRoomMutation] = useDeleteRoomMutation()
    const [leaveUserMutation] = useRemoveUserMutation()

    useWebSocket(WS_URL, {
        onOpen: () => {
            console.log('WebSocket connection established.');
        }, share: true, filter: () => false, retryOnError: true, shouldReconnect: () => true
    });

    useEffect(() => {
        async function fetchData() {
            if (isLogged()) {
                setIsContentVisible(true)
                const roomId = getRoomId(roomReducer.roomId, window.location.href)
                if (roomId !== roomReducer.roomId) {
                    updateRoomId(window.location.href)
                }
                return await roomMutation(roomId).unwrap()
            } else {
                navigate(IROBRoutes.nonAuthPage)
            }
        }

        fetchData().catch((e) => {
            console.log("load room error: " + e)
        }).then(data => {
            dispatch(updateRoom(data))
        })
    }, [])

    const handleDeleteRoomClick = async () => {
        try {
            const payload = await deleteRoomMutation(roomReducer.roomId).unwrap()
            if (payload) {
                navigate(-1)
            } else {
                setIsDeleteDialogVisible(false)
            }
        } catch (e) {
            console.log(e)
            setIsDeleteDialogVisible(false)
        }
    }

    const onBackClick = async () => {
        removeUserFromRoom()
        dispatch(clearRoom)
        navigate(-1)
    }

    function removeUserFromRoom() {
        leaveUserMutation(roomReducer.roomId)
    }

    return {
        roomReducer,
        setIsDeleteDialogVisible,
        isDeleteDialogVisible,
        handleDeleteRoomClick,
        isRequirementsDialogVisible,
        setIsRequirementsDialogVisible,
        isContentVisible,
        isSettingsDialogVisible,
        setIsSettingsDialogVisible,
        onBackClick
    }

}

export function getRoomId(roomId: string, browserHref: string) {
    if (roomId === "") {
        roomId = browserHref.substring(browserHref.lastIndexOf("/") + 1, browserHref.length)
        return roomId
    } else {
        return roomId
    }
}