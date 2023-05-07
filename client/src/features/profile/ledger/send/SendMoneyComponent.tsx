import {buttonTheme, buttonThemeDisabled, buttonThemeTransparentSmall} from "../../../../themes/Themes";
import React from "react";
import {BackButtonLedger} from "../components/BackButtonLedger";
import useViewModel from "./SendMoneyViewModel"

export interface SendMoneyProps {
    onBackClick: () => void
    maxBalance: number
}

export function SendMoneyComponent({onBackClick, maxBalance}: SendMoneyProps) {
    const {value, error, setAddress, isLoading, setValue, onMaxClick, onSendClick} = useViewModel(maxBalance)
    const sendStyle = isLoading ? `${buttonThemeDisabled} w-full ` : `${buttonTheme} w-full`
    return <div className="w-[500px] border-2 border-[#4a5058] h-fit rounded-lg p-2 items-center relative">
        <div className="flex items-center mt-2 ml-2">
            <BackButtonLedger onBackClick={onBackClick}/>
            <h1 className="text-3xl text-white ml-4">Send</h1>
        </div>
        <div className="flex justify-center min-h-[180px]">
            <div className="m-auto text-center">
                <input
                    placeholder="0"
                    value={value}
                    autoFocus={true}
                    onChange={(field) => setValue(field.target.value)}
                    className="outline-none bg-transparent text-center text-5xl text-white w-[250px]"
                />
                <h2>- ETH</h2>
                <button
                    onClick={onMaxClick}
                    className={buttonThemeTransparentSmall + " h-fit py-0 mt-4"}>
                    Use Max
                </button>
            </div>
        </div>
        <div className="m-4 space-y-4">
            <div className="space-y-1">
                <input
                    onChange={(field) => setAddress(field.target.value)}
                    placeholder="Address 0x"
                    className="outline-none bg-transparent border-[#4a5058] border-2 p-4 rounded-md text-white w-full"
                />
                {error !== "" && <div className="text-red-600 text-sm ml-2">
                    <h2>{error}</h2>
                </div>}
            </div>
            <button
                onClick={onSendClick}
                className={sendStyle}>
                {isLoading ? "Sending... " : "Send"}
            </button>
        </div>
    </div>
}