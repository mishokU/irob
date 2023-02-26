import {useState} from "react";
import {CenterMenu} from "./CenterMenu";
import {useSelector} from "react-redux";
import {RootState} from "../../../../data/store";

export default function RoomMessengerMainViewModel() {

    const [menu, setMenu] = useState(CenterMenu.CHAT)
    const roomReducer = useSelector((state: RootState) => state.room)

    function isAgreed(): boolean {
        return roomReducer.firstAgreement && roomReducer.secondAgreement
    }

    function setChat(){
        setMenu(CenterMenu.CHAT)
    }

    function setPayment() {
        setMenu(CenterMenu.PAYMENT)
    }

    return {
        menu,
        setChat,
        setPayment,
        isAgreed
    }

}