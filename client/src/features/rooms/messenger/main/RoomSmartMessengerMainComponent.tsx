import useViewModel from "./RoomMessengerMainViewModel";
import {RoomMessengerProps} from "./RoomMessengerProps";
import {RoomChatComponent} from "../chat/RoomChatComponent";
import {CenterMenu} from "./CenterMenu";
import {RoomPaymentComponent} from "../../payment/RoomPaymentComponent";
import {RoomMessengerTabs} from "./RoomMessengerTabs";

export function RoomSmartMessengerMainComponent({isVisible, setIsVisible, roomName, setMenu,  menu}: RoomMessengerProps) {
    const {isAgreed} = useViewModel()
    return <div className="w-full h-full">
        <div className="relative flex w-full">
            <div className="text-white lg:text-2xl text-lg">Smart messenger of {roomName}</div>
            {isAgreed() && <div className="lg:block hidden absolute ml-auto left-0 right-0 mr-auto bottom-0.5">
                <RoomMessengerTabs menu={menu} setMenu={setMenu}/>
            </div>}
        </div>
        {menu === CenterMenu.CHAT && <RoomChatComponent
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            isDealButtonVisible={!isAgreed()}
        />}
        {menu === CenterMenu.PAYMENT && <RoomPaymentComponent/>}
    </div>
}