import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {useEffect, useState} from "react";
import {
    updateFirstAgreement,
    updateSecondAgreement
} from "../../../../../data/slices/RoomSlice";
import {
    useGetRequiredRequirementsCountMutation
} from "../../../../../data/store/rooms/RoomRequirementsApi";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../page/RoomViewModel";
import {
    getHandleAgreement, isHandleAgreementEvent, RoomWebSocketTypes
} from "../../../domain/HandleEventTypes";

export default function MakeDealViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [requiredRequirementCountMutation] = useGetRequiredRequirementsCountMutation()

    const [agreementCount, setAgreementCount] = useState(getAgreementCount())

    const [applyRequirementsCount, setApplyRequirementCount] = useState(0)
    const [fullApplyRequirementsCount, setFullApplyRequirementsCount] = useState(
        0)

    const dispatch = useDispatch();

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isHandleAgreementEvent
    });

    useEffect(() => {
        async function loadDeal() {
            return requiredRequirementCountMutation(roomReducer.roomId).unwrap()
        }

        loadDeal()
            .catch((e) => console.log(e))
            .then((data: any) => {
                setApplyRequirementCount(data.count)
                setFullApplyRequirementsCount(data.fullCount)
            })
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            const data = getHandleAgreement(lastMessage)
            updateAgreementCount(data.isAgreed)
            if (data.isOwner) {
                dispatch(updateFirstAgreement(data.isAgreed))
            } else {
                dispatch(updateSecondAgreement(data.isAgreed))
            }
        }
    }, [lastMessage])

    const onAgreementClick = async () => {
        try {
            const isAgreed = getAgreement()
            sendJsonMessage({
                type: RoomWebSocketTypes.handleAgreement,
                roomId: roomReducer.roomId,
                isOwner: roomReducer.ownerId === profileReducer.profileId,
                isAgreed: isAgreed
            })
        } catch (e) {
            console.log(e)
        }
    }

    function getAgreement() {
        let isAgreed = false
        if (roomReducer.ownerId === profileReducer.profileId) {
            isAgreed = roomReducer.firstAgreement
        } else if (roomReducer.userId === profileReducer.profileId) {
            isAgreed = roomReducer.secondAgreement
        }
        return isAgreed
    }

    function getAgreementCount(): number {
        let count = 0
        if (roomReducer.firstAgreement) {
            count += 1
        }
        if (roomReducer.secondAgreement) {
            count += 1
        }
        return count
    }

    function updateAgreementCount(isAgreed: boolean) {
        if (isAgreed) {
            setAgreementCount(agreementCount + 1)
        } else {
            setAgreementCount(agreementCount - 1)
        }
    }

    return {
        onAgreementClick,
        agreementCount,
        applyRequirementsCount,
        fullApplyRequirementsCount
    }

}