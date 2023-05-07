import useViewModel from "./FaqViewModel"
import {FaqItem} from "./FaqItem";
import {Footer} from "../footer/components/Footer";

export function FaqPage() {
    const {items} = useViewModel()
    return <div className="mt-24">
        <div className="text-center">
            <div className="space-y-6">
                <h1 className="text-[#ffb81c]">FAQ</h1>
                <h2 className="text-white text-6xl">We have answer.</h2>
                <p className="text-[#8fadc0]">Here’s are some of the most common ones we've already <br/> been
                    asked. If
                    you have any questions that
                    are not listed <br/> below feel free to <a href="" className="text-[#ffb81c] underline"> contact
                        us </a></p>
            </div>
        </div>
        <div className="flex items-center justify-center">
            <div className="mt-16 mb-16">
                <h1 className="text-lg text-[#ffb81c] mb-4">1. PLATFORM GETTING STARTED AND DEFAULT MESSAGES</h1>
                <div className="mt-8 space-y-4">
                    {items.map((item) => <FaqItem item={item}/>)}
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}