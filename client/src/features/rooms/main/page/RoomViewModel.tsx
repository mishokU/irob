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
import {useContentFullCardContext} from "../../../main/contexts/ContentFullCardProvider";
import {useModalsContext} from "../../../main/contexts/ModalsProvider";

export const WS_URL = process.env.WS_URL || 'ws://localhost:8080';

export default function RoomViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
    const [isContentVisible, setIsContentVisible] = useState(false)
    const [isSettingsDialogVisible, setIsSettingsDialogVisible] = useState(false)
    const [isMakeDealDialogVisible, setIsMakeDealDialogVisible] = useState(false)
    const [isRequirementVisible, setIsRequirementVisible] = useState<RequirementState>({
        isVisible: false, requirement: null
    })

    const [isPaymentButtonVisible, setIsPaymentButtonVisible] = useState(roomReducer.isAdmin && !roomReducer.isFinished)

    const navigate = useNavigate();
    const dispatch = useDispatch();

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
                console.log(data)
                dispatch(updateRoom(data))
            }).then(() => setIsContentVisible(true))
    }, [])

    useEffect(() => {
        setIsMakeDealDialogVisible(false)
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
    const useFullCard = useContentFullCardContext()

    const onShowCardClick = async () => {
        if (roomReducer.contentId !== 0) {
            useFullCard?.setVisibility({
                isVisible: true,
                contentId: roomReducer.contentId,
                fromCatalogue: false
            })
        } else {
            const data = await getContentId(roomReducer.roomId).unwrap()
            if (data.success) {
                useFullCard?.setVisibility({
                    isVisible: true,
                    contentId: data.contentId,
                    fromCatalogue: false
                })
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