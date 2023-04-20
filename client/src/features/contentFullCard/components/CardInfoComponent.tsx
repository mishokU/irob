import {Dialog} from "@headlessui/react";
import {fakeContent} from "../FakeData";
import {BookmarkOutFilledIcon} from "../../../ui/common/icons/BookmarkOutFilledIcon";
import {ComplaintIcon} from "../../../ui/common/icons/ComplaintIcon";
import {nonRoundedButtonTheme} from "../../../themes/Themes";
import {useContentFullCardContext} from "../../main/contexts/ContentFullCardProvider";

export function CardInfoComponent() {
    const useContext = useContentFullCardContext()
    return <div className="text-white">
        <div className="flex justify-between">
            <div className="flex space-x-4">
                <Dialog.Title className="text-3xl font-bold">{fakeContent.name}</Dialog.Title>
                <BookmarkOutFilledIcon/>
                <ComplaintIcon/>
            </div>
            <div className="hover:bg-gray-200 hover:rounded-full p-2" onClick={() => {
                useContext?.setVisibility({isVisible: false, contentId: null})
            }}>
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
        </div>
        <div className="flex">
            <div className="flex">
                <div className="max-w-lg pr-16 space-y-4">
                    <div className="mt-4 flex space-x-2 text-white">
                        <p>{fakeContent.contentType}</p>
                        <p>{fakeContent.contentYear}</p>
                        <p>{fakeContent.duration}</p>
                    </div>
                    <div>
                        <p>{fakeContent.description}</p>
                    </div>
                    <div>
                        <p>{fakeContent.genres}</p>
                    </div>
                    <div className="grid-cols-2 gap-2">
                        <div className="flex space-x-4">
                            <h1>Country</h1>
                            <p>{fakeContent.country}</p>
                        </div>
                        <div className="flex space-x-4">
                            <h1>Country</h1>
                            <p>{fakeContent.country}</p>
                        </div>
                        <div className="flex space-x-4">
                            <h1>Country</h1>
                            <p>{fakeContent.country}</p>
                        </div>
                        <div className="flex space-x-4">
                            <h1>Country</h1>
                            <p>{fakeContent.country}</p>
                        </div>
                    </div>
                    <p className="mt-16">Watch the video and sing up here!</p>
                </div>
                <div className="mt-8">
                    <img className="w-[224px] h-[324px] bg-black"/>
                    <button className={nonRoundedButtonTheme + " mt-4 w-full"} onClick={() => {

                    }}>Buy
                    </button>
                    <button className={nonRoundedButtonTheme + " mt-4 w-full"} onClick={() => {

                    }}>Play trailer
                    </button>
                </div>
            </div>
        </div>
    </div>
}