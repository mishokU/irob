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
import {isLogged} from "../../../../domain/checkers/Checkers";
import {useRemoveUserMutation} from "../../../../data/store/rooms/RoomUsersApi";
import {RequirementState} from "./RequirementState";
import {useModalsContext} from "../../../main/contexts/ModalsProvider";

export const WS_URL = process.env.WS_URL || 'ws://localhost:8080';

export default function RoomViewModel() {

    const dispatch = useDispatch();

    const roomReducer = useSelector((state: RootState) => state.room)

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [isContentVisible, setIsContentVisible] = useState(false)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const [isMakeDealDialogVisible, setIsMakeDealDialogVisible] = useState(false)
    const [isRequirementVisible, setIsRequirementVisible] = useState<RequirementState>({
        isVisible: false, requirement: null
    })

    const [isPaymentButtonVisible, setIsPaymentButtonVisible] = useState(false)

    const navigate = useNavigate();

    const [roomMutation] = useGetRoomMutation()
    const [deleteRoomMutation] = useDeleteRoomMutation()
    const [leaveUserMutation] = useRemoveUserMutation()
    const [getContentId] = useGetContentIdMutation()

    useWebSocket(WS_URL, {
        onError: (error) => {
            console.log(error)
        },
        onOpen: () => {
            console.log('WebSocket connection established.');
        }, share: true, filter: () => false, retryOnError: true, shouldReconnect: () => true
    });

    useEffect(() => {
        async function fetchData() {
            if (isLogged()) {
                const roomId = getRoomId(roomReducer.roomId, window.location.href)
                if (roomId !== roomReducer.roomId) {
                    dispatch(updateRoomId(window.location.href))
                }
                return await roomMutation(roomId).unwrap()
            } else {
                navigate(IROBRoutes.nonAuthPage)
            }
        }

        fetchData()
            .catch((e) => console.log("load room error: " + e))
            .then(data => {
                if (data) {
                    dispatch(updateRoom(data))
                    setIsPaymentButtonVisible(data.isAdmin && (!data.firstAgreement && !data.secondAgreement))
                }
            }).then(() => setIsContentVisible(true))
    }, [])

    useEffect(() => {
        console.log("is finished: " + roomReducer.isFinished)
        const visible = !roomReducer.isFinished
        console.log(visible)
        setIsMakeDealDialogVisible(false)
        setIsPaymentButtonVisible(visible)
    }, [roomReducer.isFinished])

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