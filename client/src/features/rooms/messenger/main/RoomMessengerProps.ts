import {Dispatch} from "react";

export interface RoomMessengerProps {
    isVisible: boolean,
    setIsVisible: Dispatch<boolean>,
    isDealButtonVisible: boolean,
    roomName: string
}