import ReactPlayer from "react-player";
import useViewModel from "./SampleViewModel"

export function SamplePage() {
    const {onLoadClick, setKey, videoUrl} = useViewModel()
    return <div className="bg-cyan-500 h-screen flex text-center justify-center items-center">
        <div className="space-y-4">
            <h1 className="text-2xl text-black">Alexey Usov video site</h1>
            <input
                className="w-full p-2"
                onChange={(licenseKey) => {
                    setKey(licenseKey.target.value)
                }}
                placeholder="licence private key"
            />
            <button
                className="w-full bg-white rounded-md p-2"
                onClick={onLoadClick}
            >Load</button>
            <ReactPlayer
                controls={true}
                url={videoUrl}
            />
        </div>
    </div>
}