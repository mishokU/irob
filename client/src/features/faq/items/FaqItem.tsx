import {UiFAQModel} from "../UiFAQModel";
import {useState} from "react";
import {ArrowUp} from "../icons/ArrowUp";
import {ArrowDown} from "../icons/ArrowDown";


export interface FaqItemProps {
    item: UiFAQModel
}

export function FaqItem({item}: FaqItemProps) {
    const [show, setShow] = useState(false)
    return <div className="rounded-lg w-full border-[#4a5058] h-fit max-w-[40em] border-2 pl-4 pr-4 pt-2 pb-2">
        <div className="flex justify-between items-center">
            <h1 className="select-none text-white text-lg font-bold">{item.question}</h1>
            <button
                onClick={() => setShow(!show)}
                className="cursor-pointer ml-4 lg:ml-0">
                {!show && <ArrowUp/>}
                {show && <ArrowDown/>}
            </button>
        </div>
        <div className={show ? "showAnswerBlock" : "hideAnswerBlock"}>
            <div className="select-none text-lg w-fit mr-8 text-[#8fadc0]">{item.answer}</div>
        </div>
    </div>
}