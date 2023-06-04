import {Dispatch} from "react";
import {CenterMenu} from "./CenterMenu";

export interface RoomMessengerProps {
    isVisible: boolean,
    setIsVisible: Dispatch<boolean>,
    isDealButtonVisible: boolean,
    roomName: string
    setMenu: Dispatch<CenterMenu>

    menu: CenterMenu
}