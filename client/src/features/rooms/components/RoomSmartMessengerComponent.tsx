import {ReactComponent as SendMessageIcon} from "../asserts/icon_send_message.svg";

export function RoomSmartMessengerComponent() {
    return <div className="w-full">
        <div className="text-white text-2xl">Smart requirements messenger</div>
        <div className="border-2 mt-4 p-4 w-full h-[700px] rounded-md">
        </div>
        <div className="flex w-full items-center mt-4 justify-center">
            <div className="border-2 w-full rounded-md h-[50px] flex mt-auto mb-auto">
                <input className="w-full pl-4 outline-none" placeholder="Write your message"/>
            </div>
            <div className="border-2 ml-2 rounded-md h-[50px] w-[50px] m-auto block pt-1 pl-1">
                <SendMessageIcon />
            </div>
        </div>
    </div>
}