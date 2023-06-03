import {buttonTheme, paragraphColor} from "../../../ui/themes/Themes";
import {initAskQuestionProps, useAskQuestionContext} from "../../main/contexts/AskQuestionProvider";
import {useState} from "react";


export function EmailSubscribeSection() {
    const askQuestion = useAskQuestionContext()
    const [email, setEmail] = useState("")
    return <section className="bg-[#0c131a] p-8">
        <div className="lg:block hidden h-20 w-full bg-[#0c131a] absolute -mt-14 opacity-5 lg:-rotate-10 -rotate-0"/>
        <div className="lg:p-8 p-4">
            <div className="lg:w-2/3 w-full h-fit lg:pt-16 pt-8 lg:pb-16 pb-4 lg:pl-8 pl-4 space-y-8 lg:pr-8 pr-4 m-auto bg-[#111a22] rounded-lg ">
                <div className="space-y-4">
                    <h2 className="lg:pl-8 text-xs text-[#ffb81c]">NOT SURE YET?</h2>
                    <h1 className="lg:pl-8 font-bold text-xl">Contact us to get more information.</h1>
                    <p className={`lg:pl-8 text-[${paragraphColor}]`}>Ask us anything and we’ll get back to
                        you with a detailed answer!
                    </p>
                </div>
                <input
                    className="lg:ml-8 lg:w-[400px] w-full focus:border-gray-600 border-transparent focus:ring-0 rounded p-3 text-white bg-[#8fadc01a]"
                    type="text"
                    onChange={(field) => setEmail(field.target.value)}
                    placeholder="Email"/>
                <button
                    onClick={() => askQuestion?.setVisibility(initAskQuestionProps(email, true))}
                    className={buttonTheme + " lg:ml-4 ml-0"}>Send</button>
            </div>
        </div>
    </section>
}