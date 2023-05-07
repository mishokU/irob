import {buttonTheme, paragraphColor} from "../../../themes/Themes";


export function EmailSubscribeSection() {
    return <section className="bg-[#0c131a] p-8">
        <div className="h-20 w-full bg-[#0c131a] absolute -mt-14 opacity-5 -rotate-10"/>
        <div className="p-8">
            <div className="w-2/3 h-fit pt-16 pb-16 pl-8 space-y-8 pr-8 m-auto bg-[#111a22] rounded-lg ">
                <div className="space-y-4">
                    <h2 className="pl-8 text-xs text-[#ffb81c]">NOT SURE YET?</h2>
                    <h1 className="pl-8 font-bold text-xl">Contact us to get more information.</h1>
                    <p className={`pl-8 text-[${paragraphColor}]`}>Ask us anything and we’ll get back to
                        you with a detailed answer!
                    </p>
                </div>
                <input
                    className="ml-8 w-[400px] focus:border-gray-600 border-transparent focus:ring-0 rounded p-3 text-white bg-[#8fadc01a]"
                    type="text"
                    placeholder="Email"/>
                <button className={buttonTheme + " ml-8"}>Send</button>
            </div>
        </div>
    </section>
}