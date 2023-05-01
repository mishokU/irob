import {useEffect, useState} from "react";
import {contentTypes} from "./CreateRequirementFormPage";
import {
    useCreateRequirementMutation, useGetRequirementMutation, useUpdateRequirementMutation
} from "../../../../../data/store/rooms/RoomRequirementsApi";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../page/RoomViewModel";
import {isRequirementEvent, RoomWebSocketTypes} from "../../../domain/requests/HandleEventTypes";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {CreateRequirementResult} from "../../../../../data/models/rooms/requirements/CreateRequirementResult";
import {RequirementState} from "../../page/RequirementState";

export default function CreateRequirementViewModel(isVisibleState: RequirementState, setIsVisibleState: (value: RequirementState) => void) {

    const roomReducer = useSelector((state: RootState) => state.room)
    const profileReducer = useSelector((state: RootState) => state.profile)

    const [contentType, setType] = useState(contentTypes[0])
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    const [customType, setCustomType] = useState("")
    const [requirementId, setRequirementId] = useState(null)
    const [isProgress, setIsProgress] = useState(false)
    const [error, setError] = useState("")

    const [isPrimaryButtonInvisible] = useState(roomReducer.isFinished || isVisibleState.requirement?.isAlive === false)

    const [createRequirementMutation] = useCreateRequirementMutation()
    const [getRequirementMutation] = useGetRequirementMutation()
    const [updateRequirementMutation] = useUpdateRequirementMutation()

    const {sendJsonMessage} = useWebSocket(WS_URL, {
        share: true, filter: isRequirementEvent
    });

    useEffect(() => {
        async function loadRequirement(id: number) {
            return await getRequirementMutation(id).unwrap()
        }

        const requirement = isVisibleState.requirement
        if (requirement !== null) {
            setIsProgress(true)
            loadRequirement(requirement.requirementId)
                .catch((e) => console.log(e))
                .then((data: any) => {
                    if(data.success === true){
                        setTitle(data.requirement.title)
                        setDescription(data.requirement.description)
                        setValue(data.requirement.value)
                        setType(getContentType(data.requirement.type))
                        setRequirementId(data.requirement.id)
                        setIsProgress(false)
                    } else {
                        setError(data.message)
                    }
                })
        }
    }, [])

    function getContentType(type: string) {
        let value = 0
        for (let i = 0; i < contentTypes.length; i++) {
            if (contentTypes[i].name === type) {
                value = i
                break
            }
        }
        return contentTypes[value]
    }

    const onActionClick = async () => {
        if(requirementId === null){
            await createRequirement()
        } else {
            await updateRequirement()
        }
    }

    async function createRequirement() {
        try {
            const type = getType()
            const roomId = roomReducer.roomId
            const payload: CreateRequirementResult = await createRequirementMutation({
                roomId, title, type, description, value
            }).unwrap()
            const requirement = payload.requirement
            sendJsonMessage({
                type: RoomWebSocketTypes.createRequirement,
                username: requirement.username,
                userId: profileReducer.profileId,
                roomId: roomReducer.roomId,
                value: value,
                requirementId: requirement.requirementId,
                requirementType: type
            })
            setIsVisibleState({isVisible: false, requirement: null})
        } catch (e) {
            console.log(e)
        }
    }

    async function updateRequirement(){
        try {
            const type = getType()
            const roomId = roomReducer.roomId
            const requirement = isVisibleState.requirement
            if(requirement !== null){
                await updateRequirementMutation({
                    id: requirement.requirementId,
                    title: title,
                    description: description,
                    value: value
                }).unwrap()
                setIsVisibleState({isVisible: false, requirement: null})
            }
        } catch (e) {
            console.log(e)
        }
    }

    function getType() {
        if (customType !== "") {
            return customType
        } else {
            return contentType.name
        }
    }

    return {
        title,
        description,
        value,
        contentType,
        customType,
        setCustomType,
        setTitle,
        setType,
        setValue,
        setDescription,
        onActionClick,
        isProgress,
        roomReducer,
        requirementId,
        isPrimaryButtonInvisible,
        error
    }

}