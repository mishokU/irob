import {useState} from "react";
import {videoPath} from "../../constants/Constants";

export default function SampleViewModel() {

    const [key, setKey] = useState<string | null>(null)
    const [videoUrl, setVideoUrl] = useState("")

    const onLoadClick = async () => {
        if (key !== null) {
            const url = videoPath + key
            console.log(url)
            setVideoUrl(url)
        }
    }

    return {
        setKey,
        videoUrl,
        onLoadClick
    }


}