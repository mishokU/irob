import {useState} from "react";
import {useSendResumeMutation} from "../../../data/store/email/ResumeApi";

export default function JoinViewModel() {

    const [file, setFile] = useState<File | null>(null)
    const [error, setError] = useState<string | null>(null)

    const [sendResume] = useSendResumeMutation()

    const handleChange = (file: File) => {
        setError(null)
        setFile(file)
    };

    const onContactClick = async () => {
        if (file !== null) {
            let formData = new FormData()
            formData.append('file', file)
            const result = await sendResume({resume: formData})

        } else {
            setError("First drop your resume!")
        }
    }


    return {
        error,
        handleChange,
        onContactClick
    }

}