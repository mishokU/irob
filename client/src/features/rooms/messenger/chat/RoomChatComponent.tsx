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
    return <>
        <div
            onScroll={onScroll}
            ref={messagesEndRef}
            className="border-2 border-[#29303A] rounded-lg lg:mt-4 mt-2 p-4 w-full lg:h-[calc(100vh-300px)]
            h-[calc(100vh-250px)] overflow-y-scroll scrollbar scroll-auto">
            {messageList.map((item: MessageUiModel) => (
                (item.type === MessageType.CONTENT && <SimpleMessageComponent key={item.id} message={item}/>) ||
                (item.type === MessageType.CREATE_REQUIREMENT && <RequirementMessageComponent message={item}/>))
            )}
        </div>
        <div className="flex w-full items-center mt-4 justify-center">
            <RoomMessageInputComponent/>
            {isDealButtonVisible && <div
                className="border-2 ml-2 rounded-lg h-[50px] w-[50px] m-auto block cursor-pointer"
                onClick={() => setIsVisible(!isVisible)}>
                <img alt="deal" src={makeDealImg}/>
            </div>}
        </div>
    </>
}