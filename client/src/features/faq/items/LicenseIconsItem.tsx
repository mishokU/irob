import {useState} from "react";
import {ArrowUp} from "../icons/ArrowUp";
import {ArrowDown} from "../icons/ArrowDown";

export function LicenseIconsItem() {
    const question = "What means statuses in license?"
    const greenAnswer = "Green status means that license is active."
    const redAnswer = "Red status means that license expired and user can not show this content anymore."
    const yellowAnswer = "Yellow status means that user pass all requirements and can claim his full deposit!"
    const whiteAnswer = "White status means that user pass all requirements and claim deposit. Contract executed!"
    const [show, setShow] = useState(false)
    return <div className="rounded-lg w-full border-[#4a5058] h-fit max-w-[40em] border-2 pl-4 pr-4 pt-2 pb-2">
        <div className="flex justify-between items-center">
            <h1 className="select-none text-white text-lg font-bold">{question}</h1>
            <button
                onClick={() => setShow(!show)}
                className="cursor-pointer ml-4 lg:ml-0">
                {!show && <ArrowUp/>}
                {show && <ArrowDown/>}
            </button>
        </div>
        <div className={show ? "showAnswerBlock" : "hideAnswerBlock"}>
            <div className="flex space-x-4 mr-8 items-center">
                <div className="bg-green-500 w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{greenAnswer}</div>
            </div>
            <div className="flex space-x-4 mr-8 items-center">
                <div className="bg-red-500 w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{redAnswer}</div>
            </div>
            <div className="flex space-x-4 mr-8 items-center">
                <div className="bg-[#ffb81c] w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{yellowAnswer}</div>
            </div>
            <div className="flex space-x-4 mr-8 items-center">
                <div className="bg-white w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{whiteAnswer}</div>
            </div>
        </div>
    </div>
}