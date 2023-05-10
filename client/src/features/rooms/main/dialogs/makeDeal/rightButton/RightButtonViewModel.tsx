import {useEffect, useState} from "react";
import {
    rightDisabled, rightMakeDealButtonTheme, rightMakeDealButtonThemeActive
} from "../../../../../../ui/themes/Themes";
import {
    getHandleAgreement,
    isRightAgreementEvent,
    RoomWebSocketTypes
} from "../../../../domain/requests/HandleEventTypes";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../../page/RoomViewModel";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../data/store";
import {RightButtonProps} from "./RightButtonProps";
import {updateFirstAgreement, updateSecondAgreement} from "../../../../../../data/slices/RoomSlice";


export default function RightButtonViewModel(
    {
        applyRequirementsCount,
        fullApplyRequirementsCount
    }: RightButtonProps) {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [rightButtonTheme, setRightButtonTheme] = useState(getRightButtonTheme(roomReducer.userId === profileReducer.profileId, roomReducer.secondAgreement))
    const [rightButtonText, setRightButtonText] = useState(getRightButtonText(roomReducer.userId === profileReducer.profileId, roomReducer.secondAgreement))

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isRightAgreementEvent
    });

    const dispatch = useDispatch();

    function getRightButtonTheme(isOwner: boolean, isAgree: boolean) {
        if (isOwner) {
            if (applyRequirementsCount < fullApplyRequirementsCount || fullApplyRequirementsCount === 0) {
                return rightDisabled
            } else if (isAgree) {
                return rightMakeDealButtonThemeActive
            } else {
                return rightMakeDealButtonTheme
            }
        } else {
            return rightDisabled
        }
    }

    function getRightButtonText(isOwner: boolean, isAgree: boolean) {
        if (isOwner) {
            if (applyRequirementsCount < fullApplyRequirementsCount || fullApplyRequirementsCount === 0) {
                return "Disabled"
            } else if (isAgree) {
                return "Click to disagree"
            } else {
                return "Click to agree"
            }
        } else {
            if (isAgree) {
                return "First side agreed"
            } else {
                return "Agreement waiting"
            }
        }
    }

    useEffect(() => {
        if (lastMessage !== null) {
            const data = getHandleAgreement(lastMessage)
            updateRightButton(data)
        }
    }, [lastMessage])

    function updateRightButton(data: any) {
        setRightButtonTheme(getRightButtonTheme(data.userId === profileReducer.profileId, data.secondAgreement))
        setRightButtonText(getRightButtonText(data.userId === profileReducer.profileId, data.secondAgreement))
        dispatch(updateSecondAgreement(data.secondAgreement))
    }

    const onRightAgreementClick = async () => {
        try {
            sendJsonMessage({
                type: RoomWebSocketTypes.rightAgreement,
                roomId: roomReducer.roomId,
                count: applyRequirementsCount,
                userId: profileReducer.profileId,
                fullCount: fullApplyRequirementsCount,
                secondAgreement: roomReducer.secondAgreement,
            })
        } catch (e) {
            console.log(e)
        }
    }

    return {
        onRightAgreementClick,
        rightButtonText,
        rightButtonTheme
    }

}