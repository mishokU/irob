import {MessageUiModel} from "../models/MessageUiModel";
import {MessageType} from "../../domain/requests/MessageModel";
import {SimpleMessageComponent} from "../messages/SimpleMessageComponent";
import {RequirementMessageComponent} from "../messages/RequirementMessageComponent";
import {RoomMessageInputComponent} from "../input/RoomMessageInputComponent";
import makeDealImg from "../../asserts/battle_48px.png";
import useViewModel from "./RoomMessengerViewModel";
import {RoomChatProps} from "./RoomChatProps";

export function RoomChatComponent({isVisible, setIsVisible, isDealButtonVisible}: RoomChatProps) {
    const {messageList, messagesEndRef, onScroll} = useViewModel()
    console.log("is visible: " + isDealButtonVisible)
    return <>
        <div
            onScroll={onScroll}
            ref={messagesEndRef}
            className="border-2 border-[#29303A] rounded-lg mt-4 p-4 w-full h-[calc(100vh-300px)] overflow-y-scroll
            scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-gray-100 scroll-auto"
        >
            {messageList.map((item: MessageUiModel) => ((item.type === MessageType.CONTENT && <SimpleMessageComponent
                key={item.id}
                message={item}/>) || (item.type === MessageType.CREATE_REQUIREMENT && <RequirementMessageComponent
                key={item.id}
                message={item}/>)))}
        </div>
        <div className="flex w-full items-center mt-4 justify-center">
            <RoomMessageInputComponent/>
            {
                isDealButtonVisible && <div
                    className="border-2 ml-2 rounded-lg h-[50px] w-[50px] m-auto block cursor-pointer"
                    onClick={() => setIsVisible(!isVisible)}>
                    <img alt="deal" src={makeDealImg}/>
                </div>
            }
        </div>
    </>
}