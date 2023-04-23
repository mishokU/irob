import {BookmarkOutFilledIcon} from "../../../ui/common/icons/BookmarkOutFilledIcon";
import {ComplaintIcon} from "../../../ui/common/icons/ComplaintIcon";
import {buttonTheme} from "../../../themes/Themes";
import {StateProps} from "../modal/ContentFullCardComponent";

export function CardInfoComponent({state}: StateProps) {
    return <div className="text-white">
        <div className="flex justify-between">
            <div className="flex space-x-4">
                <div className="text-3xl font-bold">{state.content.name}</div>
                <BookmarkOutFilledIcon/>
                <ComplaintIcon/>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg"
                 fill="none"
                 viewBox="0 0 24 24"
                 strokeWidth="1.5"
                 stroke="currentColor"
                 className="w-6 h-6">
                <path strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"/>
            </svg>
        </div>
        <div className="flex">
            <div className="flex">
                <div className="max-w-lg pr-16 space-y-4">
                    <div className="mt-4 flex space-x-2 text-white">
                        <p>{state.content.type}</p>
                        <p>{state.content.year}</p>
                        <p>{state.content.duration}</p>
                    </div>
                    <div>
                        <p>{state.content.description}</p>
                    </div>
                    <div>
                        <p>{state.content.genres}</p>
                    </div>
                    <div className="grid-cols-2 gap-2">
                        <div className="flex space-x-4">
                            <h1>Country</h1>
                            <p>{state.content.country}</p>
                        </div>
                    </div>
                    <p className="mt-16">Watch the video and sing up here!</p>
                </div>
                <div className="mt-8">
                    <img src={state.content.videoPreview} className="w-[20em] h-[13em] bg-black"/>
                    {
                        state.content.videoTrailerUrl &&
                        <button className={buttonTheme + " mt-4 w-full"} onClick={() => {

                        }}>Play trailer
                        </button>
                    }
                </div>
            </div>
        </div>
    </div>
}