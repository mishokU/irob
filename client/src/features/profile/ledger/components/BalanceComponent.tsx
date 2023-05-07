import {IROBProgressBar} from "../../../../ui/common/IROBProgressBar";
import {buttonTheme} from "../../../../themes/Themes";
import {SendIcon} from "../icons/SendIcon";
import {ReceiveIcon} from "../icons/ReceiveIcon";
import {ProfileLedgerState} from "../page/ProfileLedgerState";

export interface BalanceProps {
    state: ProfileLedgerState
    connect: () => Promise<string[] | null>
    onSendClick: () => void
    onReceiveClick: () => void
}

export function BalanceComponent({state, connect, onReceiveClick, onSendClick} : BalanceProps) {
    return <div className="w-[500px] border-2 border-[#4a5058] h-fit rounded-lg p-2 items-center relative">
        {state.isLoading && <IROBProgressBar/>}
        <h1 className="text-3xl text-white ml-4 mt-2">Balance</h1>
        <div className="flex justify-center min-h-[180px]">
            {state.isLedgerConnected && !state.isLoading && <div className="mt-24 space-y-2">
                <h1 className="text-5xl text-center">{state.balance} - ETH </h1>
                <p className="text-center text-[#8fadc0]">Available Balance</p>
            </div>}
            {!state.isLedgerConnected && <button
                onClick={connect}
                className={buttonTheme + ' mt-24 mb-[128px] w-fit'}>Connect wallet
            </button>}
        </div>
        {state.isLedgerConnected && <div className="flex space-x-16 justify-center mt-24 mb-6">
            <div className="space-y-2">
                <div
                    onClick={onSendClick}
                    className="bg-gray-700 hover:bg-black cursor-pointer rounded-2xl p-4 w-fit">
                    <SendIcon />
                </div>
                <h1 className="text-center">Send</h1>
            </div>
            <div className="space-y-2">
                <div
                    onClick={onReceiveClick}
                    className="bg-gray-700 hover:bg-black cursor-pointer rounded-2xl p-4 w-fit">
                    <ReceiveIcon />
                </div>
                <h1 className="text-center">Receive</h1>
            </div>
        </div>}
    </div>
}