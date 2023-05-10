import {useState} from "react";
import {ArrowUp} from "../icons/ArrowUp";
import {ArrowDown} from "../icons/ArrowDown";

export function RoomIconsItem() {
    const question = "What means red and green statuses in room?"
    const greenAnswer = "Green status means that people try to deal"
    const redAnswer = "Red status means that deal was made but wait for payment"
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
            <div className="flex space-x-4 items-center">
                <div className="bg-green-500 w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{greenAnswer}</div>
            </div>
            <div className="flex space-x-4 items-center">
                <div className="bg-red-500 w-3 h-3 min-w-fit rounded rounded-full"/>
                <div className="select-none text-lg w-fit mr-4 text-[#8fadc0]">{redAnswer}</div>
            </div>
        </div>
    </div>
}