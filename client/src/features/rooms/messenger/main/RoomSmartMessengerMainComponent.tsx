import useViewModel from "./RoomMessengerMainViewModel";
import {RoomMessengerProps} from "./RoomMessengerProps";
import {RoomChatComponent} from "../chat/RoomChatComponent";
import {CenterMenu} from "./CenterMenu";
import {RoomPaymentComponent} from "../payment/RoomPaymentComponent";
import {RoomMessengerTabs} from "./RoomMessengerTabs";

export function RoomSmartMessengerMainComponent({isVisible, setIsVisible, roomName}: RoomMessengerProps) {
    const {menu, setChat, setPayment, isAgreed} = useViewModel()

    return <div className="w-full">
        <div className="relative flex w-full">
            <div className="text-white text-2xl">Smart messenger of {roomName}</div>
            {
                isAgreed() && <div className="absolute ml-auto left-0 right-0 mr-auto bottom-0.5">
                    <RoomMessengerTabs menu={menu} setChat={setChat} setPayment={setPayment} />
                </div>
            }
        </div>
        {menu === CenterMenu.CHAT && <RoomChatComponent isVisible={isVisible} setIsVisible={setIsVisible} />}
        {menu === CenterMenu.PAYMENT && <RoomPaymentComponent />}
    </div>
}