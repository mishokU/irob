import {useState} from "react";

export default function SampleViewModel() {

    const [key, setKey] = useState<string | null>(null)
    const [videoUrl, setVideoUrl] = useState("")

    const path = "http://localhost:8012/api/api/getVideoUrl?licenseKey="

    const onLoadClick = async () => {
        if (key !== null) {
            const url = path + key
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