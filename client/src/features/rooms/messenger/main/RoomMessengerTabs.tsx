import React from "react";
import {CenterMenu} from "./CenterMenu";

export interface RequirementTabProps {
    menu: CenterMenu,
    setChat: () => void
    setPayment: () => void
}

export function RoomMessengerTabs({menu, setChat, setPayment}: RequirementTabProps) {
    const menuStyle = "p-2 border-[#4a5058] text-white rounded-md border-2 w-[100px]"
    const menuStyleActive = "p-2 bg-[#1E252F] text-white rounded-md border-[#29303A] border-2 w-[100px]"
    return <div>
        <ul className="flex justify-center text-sm font-medium text-center space-x-3" role="tablist">
            <li role="presentation">
                <button className={menu === CenterMenu.CHAT ? menuStyleActive : menuStyle} onClick={() => {
                    setChat()
                }}>Chat
                </button>
            </li>
            <li role="presentation">
                <button className={menu === CenterMenu.PAYMENT ? menuStyleActive : menuStyle} onClick={() => {
                    setPayment()
                }}>Payment
                </button>
            </li>
        </ul>
    </div>
}