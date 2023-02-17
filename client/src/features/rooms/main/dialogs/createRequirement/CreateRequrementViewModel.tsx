import {useState} from "react";
import {contentTypes} from "./CreateRequirementFormPage";

export default function CreateRequirementViewModel() {

    const [type, setType] = useState(contentTypes[0])
    const [title, setTitle] = useState("")
    const [value, setValue] = useState("")
    const [description, setDescription] = useState("")
    const [customType, setCustomType] = useState("")


    const handleCreateRequirement = async () => {
        try {

        } catch (e){
            console.log(e)
        }
    }

    return {
        title,
        description,
        value,
        type,
        customType,
        setCustomType,
        setTitle,
        setType,
        setValue,
        setDescription,
        handleCreateRequirement
    }

}