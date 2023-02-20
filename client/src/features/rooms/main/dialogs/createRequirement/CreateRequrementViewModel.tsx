import {Dispatch, useState} from "react";
import {contentTypes} from "./CreateRequirementFormPage";
import {useCreateRequirementMutation} from "../../../../../data/store/rooms/RoomRequirementsApi";
import useWebSocket from "react-use-websocket";
import {WS_URL} from "../../page/RoomViewModel";
import {isRequirementEvent, RoomWebSocketTypes} from "../../../domain/HandleEventTypes";
import {useSelector} from "react-redux";
import {RootState} from "../../../../../data/store";
import {CreateRequirementResult} from "../../../../../data/rooms/requirements/CreateRequirementResult";

export default function CreateRequirementViewModel(setIsVisible: Dispatch<boolean>) {

    const roomReducer = useSelector((state: RootState) => state.room)

    const [contentType, setType] = useState(contentTypes[0])
    const [title, setTitle] = useState("")
    const [value, setValue] = useState(0)
    const [description, setDescription] = useState("")
    const [customType, setCustomType] = useState("")

    const [createRequirementMutation] = useCreateRequirementMutation()

    const {sendJsonMessage} = useWebSocket(WS_URL, {
        share: true, filter: isRequirementEvent
    });

    const handleCreateRequirement = async () => {
        try {
            const type = getType()
            const roomId = roomReducer.roomId
            const payload: CreateRequirementResult = await createRequirementMutation({
                roomId,
                title,
                type,
                description,
                value
            }).unwrap()
            const requirement = payload.requirement
            sendJsonMessage({
                type: RoomWebSocketTypes.createRequirement,
                username: requirement.username,
                requirementId: requirement.requirementId
            })
            setIsVisible(false)
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
        handleCreateRequirement
    }

}