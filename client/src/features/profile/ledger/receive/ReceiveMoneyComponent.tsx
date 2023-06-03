import {BackButtonLedger} from "../components/BackButtonLedger";
import React from "react";
import {initNotification, usePopupContext} from "../../../main/contexts/NotificationProvider";
import {ReactComponent as CopyIcon} from "../../asserts/content_copy_white_24dp.svg";

export interface ReceiveMoneyProps {
    onBackClick: () => void
    account: string | null
}

export function ReceiveMoneyComponent({onBackClick, account}: ReceiveMoneyProps) {
    const notificationContext = usePopupContext()
    return <div className="lg:w-[500px] w-full border-2 border-[#4a5058] h-fit rounded-lg p-2 items-center relative">
        <div className="flex items-center mt-2 ml-2">
            <BackButtonLedger onBackClick={onBackClick}/>
            <h1 className="text-3xl text-white ml-4">Receive</h1>
        </div>
        <div className="ml-4 mr-4 mt-8 mb-8 h-fit space-y-2">
            <div className="flex justify-between items-center">
                <h2 className="text-lg">Account address</h2>
                <div className="bg-transparent hover:bg-black border-transparent p-2 hover:rounded-full"
                     onClick={() => {
                         if (account !== null) {
                             navigator.clipboard.writeText(account)
                             notificationContext?.setState(initNotification("Address copied!"))
                         }
                     }}>
                    <CopyIcon/>
                </div>
            </div>
            <div className="pl-4 pr-4 pt-2 pb-2 border-2 rounded-lg truncate border-[#4a5058]">
                {account}
            </div>
        </div>
    </div>
}