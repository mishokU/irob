import useViewModel from "./FaqViewModel"
import {FaqItem} from "./items/FaqItem";
import {Footer} from "../footer/components/Footer";
import {RoomIconsItem} from "./items/RoomIconsItem";
import {LicenseIconsItem} from "./items/LicenseIconsItem";
import {initAskQuestionProps, useAskQuestionContext} from "../main/contexts/AskQuestionProvider";

export function FaqPage() {
    const {items} = useViewModel()
    const askQuestion = useAskQuestionContext()
    return <div className="mt-24 ml-4 mr-4">
        <div className="text-center">
            <div className="space-y-6">
                <h1 className="text-[#ffb81c] text-2xl">FAQ</h1>
                <h2 className="text-white lg:text-6xl text-3xl">We have answer.</h2>
                <p className="text-[#8fadc0]">Here’s are some of the most common ones we've already <br
                    className="lg:block hidden"/> been
                    asked. If
                    you have any questions that
                    are not listed <br className="lg:block hidden"/> below feel free to <a
                        onClick={() => askQuestion?.setVisibility(initAskQuestionProps(null, true))}
                        className="text-[#ffb81c] underline cursor-pointer"> contact
                        us </a></p>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="mt-16 mb-16">
                <h1 className="text-lg text-[#ffb81c] mb-4">1. PLATFORM GETTING STARTED AND DEFAULT MESSAGES</h1>
                <div className="mt-8 space-y-4">
                    {items.map((item) => <FaqItem item={item}/>)}
                    <RoomIconsItem/>
                    <LicenseIconsItem/>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}