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

export default function RequirementsViewModel() {

    const [requirements, setRequirements] = useState<RoomRequirementModel[]>([])
    const [fullRequirements, setFullRequirements] = useState<RoomRequirementModel[]>([])

    const roomReducer = useSelector((state: RootState) => state.room)

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
                        isApplyButtonVisible: requirement.is_alive,
                        requirementId: requirement.requirementId
                    }
                })
                updateRequirements(requirements)
                filterRequirements()
            })
    }, [getRequirementsMutation, roomReducer.roomId])

    useEffect(() => {
        if (lastMessage !== null) {
            const type = getEventType(lastMessage)
            if (type === RoomWebSocketTypes.createRequirement) {
                const requirement = getRequirement(lastMessage)
                setRequirements((prev) => prev.concat(requirement));
                setFullRequirements((prev) => prev.concat(requirement));
            } else if (type === RoomWebSocketTypes.applyRequirement) {
                const requirementId = getRequirement(lastMessage).requirementId
                updateRequirements(requirements.map((requirement) => {
                    if(requirementId === requirement.requirementId){
                        requirement.isApplyButtonVisible = false
                    }
                    return requirement
                }))
            } else if (type === RoomWebSocketTypes.declineRequirement) {
                removeRequirement(getRequirement(lastMessage).requirementId)
            }
        }
    }, [lastMessage])

    function filterRequirements(){
        if (menu === RequirementsMenu.APPLIED) {
            setRequirements(fullRequirements.filter((requirement) => !requirement.isApplyButtonVisible))
        } else {
            setRequirements(fullRequirements.filter((requirement) => requirement.isApplyButtonVisible))
        }
    }

    function removeRequirement(requirementId: number) {
        const filteredRequirements = requirements.filter((requirement: RoomRequirementModel) => requirement.requirementId !== requirementId)
        setRequirements(filteredRequirements)
        setFullRequirements(filteredRequirements)
    }

    function updateRequirements(requirements: RoomRequirementModel[]){
        setRequirements(requirements)
        setFullRequirements(requirements)
    }

    const onRequirementClick = () => {

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