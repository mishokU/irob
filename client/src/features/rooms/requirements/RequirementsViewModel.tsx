import {useEffect, useState} from "react";
import {RoomRequirementModel} from "../../../domain/rooms/RoomRequirementModel";
import {
    useApplyRequirementMutation, useDeclineRequirementMutation, useGetRequirementsMutation
} from "../../../data/store/rooms/RoomRequirementsApi";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../main/page/RoomViewModel";
import {getEventType, getRequirement, isRequirementEvent, RoomWebSocketTypes} from "../domain/HandleEventTypes";
import {RequirementMenuHandlerDelegate} from "./RequirementMenuHandlerDelegate";
import {RequirementsMenu} from "./RequirementsMenu";
import {RequirementState} from "../main/page/RequirementState";

export default function RequirementsViewModel(setIsVisibleState: (value: RequirementState) => void) {

    const [requirements, setRequirements] = useState<RoomRequirementModel[]>([])
    const [fullRequirements, setFullRequirements] = useState<RoomRequirementModel[]>([])

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [getRequirementsMutation] = useGetRequirementsMutation()
    const [applyRequirementMutation] = useApplyRequirementMutation()
    const [declineRequirementMutation] = useDeclineRequirementMutation()

    const {menu, setMenu} = RequirementMenuHandlerDelegate()

    const {sendJsonMessage, lastMessage} = useWebSocket(WS_URL, {
        share: true, filter: isRequirementEvent
    });

    useEffect(() => {
        filterRequirements()
    }, [menu])

    useEffect(() => {
        async function loadRoomRequirements() {
            return getRequirementsMutation(roomReducer.roomId).unwrap()
        }

        loadRoomRequirements()
            .catch((e) => console.log(e))
            .then((data: any) => {
                const requirements = data.requirements.map((requirement: any) => {
                    return {
                        username: requirement.username,
                        isApplyButtonVisible: requirement.isAlive && requirement.userId !== profileReducer.profileId,
                        requirementId: requirement.requirementId,
                        isAlive: requirement.isAlive
                    }
                })
                updateRequirements(requirements)
            })
    }, [])

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getEventType(lastMessage)
            if (type === RoomWebSocketTypes.createRequirement) {
                const requirement = getRequirement(lastMessage, profileReducer.profileId)
                setRequirements((prev) => prev.concat(requirement));
                setFullRequirements((prev) => prev.concat(requirement));
            } else if (type === RoomWebSocketTypes.applyRequirement) {
                const requirementId = getRequirement(lastMessage, profileReducer.profileId).requirementId
                updateRequirements(requirements.map((requirement) => {
                    if (requirementId === requirement.requirementId) {
                        requirement.isAlive = false
                    }
                    return requirement
                }))
            } else if (type === RoomWebSocketTypes.declineRequirement) {
                removeRequirement(getRequirement(lastMessage, profileReducer.profileId).requirementId)
            }
        }
    }, [lastMessage])

    function filterRequirements() {
        if (menu === RequirementsMenu.APPLIED) {
            setRequirements(fullRequirements.filter((requirement) => !requirement.isAlive))
        } else {
            setRequirements(fullRequirements.filter((requirement) => requirement.isAlive))
        }
    }

    function removeRequirement(requirementId: number) {
        const filteredRequirements = requirements.filter((requirement: RoomRequirementModel) => requirement.requirementId !== requirementId)
        setRequirements(filteredRequirements)
        setFullRequirements(filteredRequirements)
    }

    function updateRequirements(requirements: RoomRequirementModel[]) {
        setFullRequirements(requirements)
        if(menu === RequirementsMenu.APPLIED){
            setRequirements(requirements.filter((requirement) => !requirement.isAlive))
        } else {
            setRequirements(requirements.filter((requirement) => requirement.isAlive))
        }
    }

    function onRequirementClick(requirement: RoomRequirementModel) {
        setIsVisibleState({isVisible: true, requirement: requirement})
    }

    const onApplyRequirementClick = async (id: number) => {
        try {
            const payload = await applyRequirementMutation({requirementId: id}).unwrap()
            if (payload.success === true) {
                sendJsonMessage({
                    type: RoomWebSocketTypes.applyRequirement, requirementId: id
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
                    type: RoomWebSocketTypes.declineRequirement, requirementId: id
                })
            }
        } catch (e) {
            console.log(e)
        }
    }

    return {
        setRequirements,
        requirements,
        menu,
        setMenu,
        onRequirementClick,
        onApplyRequirementClick,
        onDeclineRequirementClick
    }

}