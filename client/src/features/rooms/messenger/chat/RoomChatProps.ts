import {Dispatch} from "react";

export interface RoomChatProps {
    isVisible: boolean,
    isDealButtonVisible: boolean,
    setIsVisible: Dispatch<boolean>
}