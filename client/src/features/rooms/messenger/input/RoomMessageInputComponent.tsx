import useViewModel from "./RoomMessageInputViewModel"
import {ReactComponent as SendMessageIcon} from "../../asserts/icon_send_message.svg";

export function RoomMessageInputComponent(){
    const {singleMessage, sendMessage, setSingleMessage} = useViewModel()
    return <div className="border-2 border-white rounded-lg w-full h-[50px] flex mt-auto mb-auto">
        <input
            className="w-full pl-4 outline-none bg-transparent text-white"
            placeholder="Write your message"
            ref={input => input && input.focus()}
            value={singleMessage}
            onKeyDown={event => {
                if (event.key === 'Enter') {
                    sendMessage()
                }
            }}
            onChange={(messageField) => setSingleMessage(messageField.target.value)}
        />
        <div
            className="ml-2 rounded-lg h-[50px] w-[50px] cursor-pointer m-auto block pt-1 pl-1"
            onClick={sendMessage}>
            <SendMessageIcon />
        </div>
    </div>
}