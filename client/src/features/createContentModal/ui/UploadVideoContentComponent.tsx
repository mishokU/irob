import {ChangeEventHandler} from "react";
import {ReactComponent as CloseModal} from "../../../ui/assets/close_black_24dp.svg";
import {buttonTheme} from "../../../themes/Themes";
import {useRef} from "react";
import ReactPlayer from "react-player";
import {Media} from "./CreateContentState";

export interface UploadVideoProps {
    handleFileChange: ChangeEventHandler<HTMLInputElement>
    clearVideo: () => void
    media: Media | null
    isTrailer: boolean
}

export function UploadVideoContentComponent({handleFileChange, media, clearVideo, isTrailer} : UploadVideoProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    return <div className={isTrailer ? ` mt-12 w-1/2` : ` mt-0 w-1/2`}>
        {!isTrailer && <h1 className="text-2xl font-bold">Content upload</h1>}
        <p className="mt-4">{isTrailer ? "Trailer (Optional)" : "Video"}</p>
        <div className="border-[#29303A] border-2 mt-2 w-[464px] h-[260px] rounded-xl justify-center items-center flex z-10">
            {
                media === null && <div>
                    <input
                        ref={inputRef}
                        className="hidden"
                        type="file"
                        id="video_upload"
                        name="video_upload"
                        onChange={handleFileChange}
                        accept=".mov,.mp4"
                    />
                    <label
                        htmlFor="video_upload"
                        className={buttonTheme + " cursor-pointer h-fit w-fit"}>Choose file</label>
                </div>
            }
            {
                media !== null && <div className="relative w-full h-full rounded-xl flex justify-center overflow-hidden">
                    <div
                        onClick={() => clearVideo()}
                        className="absolute right-2 top-2 z-10">
                        <CloseModal/>
                    </div>
                    <ReactPlayer
                        className='overflow-hidden object-fit'
                        width='100%'
                        height='260px'
                        controls={true}
                        url={media.url}/>
                </div>
            }
        </div>
        <div className="m-2">
            <h2>Drag and drop files here or click the button below to select them on your computer.
                Until you publish the video, access to them will be limited.</h2>
        </div>
    </div>
}