import useViewModel from "./ProfileLedgerViewModel"
import {ProfileLedgerMenuHandler} from "./ProfileLedgerMenuHandler";
import {ReceiveIcon} from "./icons/ReceiveIcon";
import {SendIcon} from "./icons/SendIcon";
import {buttonTheme} from "../../../themes/Themes";

export function ProfileLedgerPage() {
    const {
        isLedgerConnected, balance, connect, onForgetAccountClick, onSendClick, onReceiveClick
    } = useViewModel()
    const {menu, setSend, setReceive} = ProfileLedgerMenuHandler()
    return <div>
        <div className="flex space-x-12">
            <div className="w-[500px] border-2 border-[#4a5058] rounded-lg p-2 items-center">
                <h1 className="text-3xl text-white ml-4 mt-2">Balance</h1>
                <div className="flex justify-center">
                    {isLedgerConnected && <div className="mt-24 space-y-2">
                        <h1 className="text-5xl text-center">{balance} - ETH </h1>
                        <p className="text-center">Available Balance</p>
                    </div>}
                    {!isLedgerConnected && <button
                        onClick={connect}
                        className={buttonTheme + ' mt-24 mb-[128px] w-fit'}>Connect wallet
                    </button>}
                </div>
                {isLedgerConnected && <div className="flex space-x-16 justify-center mt-24 mb-6">
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
            <div className="w-[400px] h-fit border-2 border-[#4a5058] rounded-lg p-2 items-center">
                <h1 className="text-3xl text-white ml-4 mt-2">Last transactions</h1>
                <p className="ml-4 mt-2">No transactions found</p>
            </div>
        </div>
    </div>
}