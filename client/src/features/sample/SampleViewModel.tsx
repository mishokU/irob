import {useState} from "react";
import {useGetVideoUrlMutation} from "../../data/store/external/ExternalApi";


export default function SampleViewModel() {

    const [key, setKey] = useState("")
    const [videoUrl, setVideoUrl] = useState("")

    const [getVideo] = useGetVideoUrlMutation()

    const onLoadClick = async () => {
        if (key !== "") {
            const data = await getVideo(key).unwrap()
            setVideoUrl(data.videoUrl)
        }
    }

    return {
        setKey,
        videoUrl,
        onLoadClick
    }


}