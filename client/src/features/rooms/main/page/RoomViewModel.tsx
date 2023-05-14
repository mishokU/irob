import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {clearRoom, updateRoom, updateRoomId} from "../../../../data/slices/RoomSlice";
import {
    useDeleteRoomMutation,
    useGetContentIdMutation,
    useGetRoomMutation
} from "../../../../data/store/rooms/RoomsApi";
import {RootState} from "../../../../data/store";
import {useNavigate} from "react-router-dom";
import useWebSocket from "react-use-websocket";
import {IROBRoutes} from "../../../../routes/IROBRoutes";
import {useRemoveUserMutation} from "../../../../data/store/rooms/RoomUsersApi";
import {RequirementState} from "./RequirementState";
import {useModalsContext} from "../../../main/contexts/ModalsProvider";
import {initNotification, NotificationPosition, usePopupContext} from "../../../main/contexts/NotificationProvider";
import {WS_URL} from "../../../../constants/Constants";
import {GetRoomResponse} from "../../../../data/models/rooms/room/GetRoomResponse";

export default function RoomViewModel() {

    const dispatch = useDispatch();

    const roomReducer = useSelector((state: RootState) => state.room)

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [isContentVisible, setIsContentVisible] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const [isMakeDealDialogVisible, setIsMakeDealDialogVisible] = useState(false)
    const [isRequirementVisible, setIsRequirementVisible] = useState<RequirementState>({
        isVisible: false, requirement: null
    })

    const [isPaymentButtonVisible, setIsPaymentButtonVisible] = useState(false)

    const notificationContext = usePopupContext()
    const navigate = useNavigate();

    const [roomMutation] = useGetRoomMutation()
    const [deleteRoomMutation] = useDeleteRoomMutation()
    const [leaveUserMutation] = useRemoveUserMutation()
    const [getContentId] = useGetContentIdMutation()

    useWebSocket(WS_URL, {
        onError: (error) => console.log(error),
        onOpen: () => console.log('WebSocket connection established.'),
        share: true,
        filter: () => false,
        retryOnError: true,
        shouldReconnect: () => true
    });

    useEffect(() => {
        async function fetchData() {
            const roomId = window.location.href.substring(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
            if (roomId !== roomReducer.roomId) {
                dispatch(updateRoomId(roomId))
            }
            return await roomMutation(roomId).unwrap()
        }

        fetchData()
            .then((data: GetRoomResponse) => {
                if (data.success) {
                    setIsContentVisible(true)
                    dispatch(updateRoom(data))
                    setIsPaymentButtonVisible(data.isAdmin && (!data.firstAgreement && !data.secondAgreement))
                } else {
                    setError(data.message)
                    setIsContentVisible(false)
                }
            })
            .catch((error) => console.log(error))
    }, [])

    useEffect(() => {
        const visible = !roomReducer.isFinished
        setIsMakeDealDialogVisible(false)
        setIsPaymentButtonVisible(visible)
    }, [roomReducer.isFinished])

    const handleDeleteRoomClick = async () => {
        try {
            const payload = await deleteRoomMutation(roomReducer.roomId).unwrap()
            console.log(payload)
            if (payload.success) {
                navigate(-1)
            } else {
                setIsDeleteDialogVisible(false)
                notificationContext?.setState(initNotification(payload.message, 3000, NotificationPosition.CENTER))
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

    const useCreateContent = useModalsContext()

    const onShowCardClick = async () => {
        if (roomReducer.contentId !== 0) {
            navigate(IROBRoutes.card, {state: {contentId: roomReducer.contentId, fromCatalogue: false}})
        } else {
            const data = await getContentId(roomReducer.roomId).unwrap()
            if (data.success) {
                navigate(IROBRoutes.card, {state: {contentId: data.contentId, fromCatalogue: false}})
            } else {
                useCreateContent?.setState({isVisible: true, roomId: roomReducer.roomId})
            }
        }
    }

    function removeUserFromRoom() {
        leaveUserMutation(roomReducer.roomId)
    }

    return {
        roomReducer,
        setIsDeleteDialogVisible,
        isDeleteDialogVisible,
        handleDeleteRoomClick,
        isContentVisible,
        isSettingsDialogVisible,
        setIsSettingsDialogVisible,
        isMakeDealDialogVisible,
        setIsMakeDealDialogVisible,
        isRequirementVisible,
        onShowCardClick,
        isPaymentButtonVisible,
        setIsRequirementVisible,
        error,
        onBackClick
    }

}

export function getRoomId(roomId: string, browserHref: string) {
    console.log(browserHref.substring(browserHref.lastIndexOf("/") + 1, browserHref.length))
    if (roomId === "") {
        roomId = browserHref.substring(browserHref.lastIndexOf("/") + 1, browserHref.length)
        return roomId
    } else {
        return roomId
    }
}