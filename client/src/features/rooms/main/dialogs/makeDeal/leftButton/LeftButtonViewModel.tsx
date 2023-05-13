import {useEffect, useState} from "react";
import {leftDisabled, leftMakeDealButtonTheme, leftMakeDealButtonThemeActive} from "../../../../../../ui/themes/Themes";
import {
    getHandleAgreement,
    isLeftAgreementEvent,
    RoomWebSocketTypes
} from "../../../../domain/requests/HandleEventTypes";
import useWebSocket from "react-use-websocket";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../../../../data/store";
import {LeftButtonProps} from "./LeftButtonProps";
import {updateFirstAgreement} from "../../../../../../data/slices/RoomSlice";
import {WS_URL} from "../../../../../../constants/Constants";


export default function LeftButtonViewModel({applyRequirementsCount, fullApplyRequirementsCount}: LeftButtonProps) {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [leftButtonTheme, setLeftButtonTheme] = useState(getLeftButtonTheme(roomReducer.ownerId === profileReducer.profileId, roomReducer.firstAgreement))
    const [leftButtonText, setLeftButtonText] = useState(getLeftButtonText(roomReducer.ownerId === profileReducer.profileId, roomReducer.firstAgreement))

    const dispatch = useDispatch();

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isLeftAgreementEvent
    });

    function getLeftButtonTheme(isOwner: boolean, isAgree: boolean): string {
        if (isOwner) {
            if (applyRequirementsCount < fullApplyRequirementsCount || fullApplyRequirementsCount === 0) {
                return leftDisabled
            } else if (isAgree) {
                return leftMakeDealButtonThemeActive
            } else {
                return leftMakeDealButtonTheme
            }
        } else {
            return leftDisabled
        }
    }

    function getLeftButtonText(isOwner: boolean, isAgree: boolean) {
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
            updateLeftButton(data)
        }
    }, [lastMessage])

    function updateLeftButton(data: any) {
        setLeftButtonTheme(getLeftButtonTheme(data.userId === profileReducer.profileId, data.firstAgreement))
        setLeftButtonText(getLeftButtonText(data.userId === profileReducer.profileId, data.firstAgreement))
        dispatch(updateFirstAgreement(data.firstAgreement))
    }

    const onLeftAgreementClick = async () => {
        try {
            sendJsonMessage({
                type: RoomWebSocketTypes.leftAgreement,
                roomId: roomReducer.roomId,
                count: applyRequirementsCount,
                userId: profileReducer.profileId,
                fullCount: fullApplyRequirementsCount,
                firstAgreement: roomReducer.firstAgreement,
            })
        } catch (e) {
            console.log(e)
        }
    }

    return {
        onLeftAgreementClick,
        leftButtonTheme,
        leftButtonText
    }

}