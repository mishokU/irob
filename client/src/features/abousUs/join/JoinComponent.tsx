import {buttonThemeTransparent} from "../../../ui/themes/Themes";
import useViewModel from "./JoinViewModel"

const fileTypes = ["PDF"];

export function JoinComponent() {
    const {handleChange, onContactClick, error} = useViewModel()
    return (<section className="pt-16">
        <div className="h-20 w-full bg-[#0c131a] absolute -mt-14 opacity-5 -rotate-10"/>
        <div className="p-8">
            <div className="w-2/3 h-fit pt-16 pb-16 pl-8 space-y-8 pr-8 m-auto bg-[#111a22] rounded-lg">
                <div className="space-y-4">
                    <h2 className="pl-8 text-lg text-[#ffb81c]">Do you wanna join to my team?</h2>
                    <h1 className="pl-8 font-bold text-xl">Contact me to get more information. <br/>
                        If you want to meet someone from <br/> our team don’t hesitate to get in touch.</h1>
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