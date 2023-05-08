import {useEffect, useState} from "react";
import {RequirementState} from "../../main/page/RequirementState";
import {RoomRequirementModel} from "../../../../domain/rooms/RoomRequirementModel";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";
import {
    useApplyRequirementMutation, useDeclineRequirementMutation,
    useGetRequirementsMutation
} from "../../../../data/store/rooms/RoomRequirementsApi";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../main/page/RoomViewModel";
import {
    getEventType,
    getRequirement,
    isRequirementEvent,
    RoomWebSocketTypes
} from "../../domain/requests/HandleEventTypes";


export default function NewRequirementsViewModel(setIsVisibleState: (value: RequirementState) => void) {

    const [newRequirements, setNewRequirements] = useState<RoomRequirementModel[]>([])

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [getRequirementsMutation] = useGetRequirementsMutation()
    const [applyRequirementMutation] = useApplyRequirementMutation()
    const [declineRequirementMutation] = useDeclineRequirementMutation()

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isRequirementEvent
    });

    useEffect(() => {
        async function loadRoomRequirements() {
            return getRequirementsMutation(roomReducer.roomId).unwrap()
        }

        loadRoomRequirements()
            .catch((e) => console.log(e))
            .then((data: any) => {
                if (data.requirements.length > 0) {
                    const requirements = data.requirements.filter((requirement: any) => requirement.isAlive).map((requirement: any) => {
                        return {
                            userId: requirement.userId,
                            username: requirement.username,
                            isApplyButtonVisible: requirement.isAlive && requirement.userId !== profileReducer.profileId,
                            requirementId: requirement.requirementId,
                            isAlive: true,
                            type: requirement.type
                        }
                    })
                    setNewRequirements(requirements)
                }
            })
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getEventType(lastMessage)
            if (type === RoomWebSocketTypes.createRequirement) {
                const requirement = getRequirement(lastMessage, profileReducer.profileId)
                setNewRequirements(newRequirements.concat(requirement))
            } else if (type === RoomWebSocketTypes.applyRequirement || type === RoomWebSocketTypes.declineRequirement) {
                removeRequirement(getRequirement(lastMessage, profileReducer.profileId).requirementId)
            }
        }
    }, [lastMessage])

    function removeRequirement(requirementId: number) {
        const filteredRequirements = newRequirements.filter((requirement: RoomRequirementModel) => requirement.requirementId !== requirementId)
        setNewRequirements(filteredRequirements)
    }

    function onRequirementClick(requirement: RoomRequirementModel) {
        setIsVisibleState({isVisible: true, requirement: requirement})
    }

    const onApplyRequirementClick = async (requirement: RoomRequirementModel) => {
        try {
            const payload = await applyRequirementMutation({
                requirementId: requirement.requirementId,
                roomId: roomReducer.roomId,
                type: requirement.type
            }).unwrap()
            if (payload.success === true) {
                sendJsonMessage({
                    type: RoomWebSocketTypes.applyRequirement,
                    requirementId: requirement.requirementId,
                    userCreatedId: requirement.userId,
                    userId: profileReducer.profileId,
                    roomId: roomReducer.roomId,
                    username: requirement.username,
                    requirementType: requirement.type
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onDeclineRequirementClick = async (id: number) => {
        try {
            const payload = await declineRequirementMutation({requirementId: id}).unwrap()
            if (payload.success === true) {
                sendJsonMessage({
                    type: RoomWebSocketTypes.declineRequirement,
                    requirementId: id,
                    userId: profileReducer.profileId,
                    roomId: roomReducer.roomId
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        newRequirements,
        onRequirementClick,
        onApplyRequirementClick,
        roomReducer,
        onDeclineRequirementClick
    }

}