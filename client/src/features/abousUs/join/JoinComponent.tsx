import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import useViewModel from "./JoinViewModel"

const fileTypes = ["PDF"];

export function JoinComponent() {
    const {handleChange, onContactClick, error} = useViewModel()
    return (<section className="lg:pt-16 pt-4">
        <div className="h-20 w-full bg-[#0c131a] absolute -mt-14 opacity-5 -rotate-10"/>
        <div className="p-8">
            <div className="lg:w-2/3 w-full h-fit lg:pt-16 pt-8 lg:pb-16 pb-8 lg:pl-8 pl-4 space-y-8 lg:pr-8 pr-4 m-auto bg-[#111a22] rounded-lg">
                <div className="space-y-4">
                    <h2 className="lg:pl-8 pl-4 text-lg text-[#ffb81c]">Do you wanna join to my team?</h2>
                    <h1 className="lg:pl-8 pl-4 font-bold text-xl">Contact me to get more information. <br/>
                        If you want to meet someone from <br className="lg:block hidden"/> our team don’t hesitate to get in touch.</h1>
                </div>
                {/*<div className="space-y-1">*/}
                {/*    <FilesDragAndDrop onUpload={handleChange} count={1} formats={fileTypes}/>*/}
                {/*    {error !== null && <div className="ml-2 mr-2 text-red-600 text-sm">{error}</div>}*/}
                {/*</div>*/}
                <button
                    onClick={onContactClick}
                    className={buttonThemeTransparent}>Contact!
                </button>
            </div>
        </div>
    </section>)
}