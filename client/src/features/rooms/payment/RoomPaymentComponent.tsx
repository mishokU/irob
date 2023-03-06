import {buttonTheme} from "../../../themes/Themes";
import rightArrow from "../asserts/right_96px.png";
import useViewModel from "./RoomPaymentViewModel"
import {IROBProgressBar} from "../../../ui/common/IROBProgressBar";

export function RoomPaymentComponent() {
    const {screenState, connect} = useViewModel()
    return <div className="border-2 border-[#29303A] rounded-lg mt-4 p-16 w-full h-[700px]">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl text-white">Payment info form</h1>
            <div className="text-2xl text-white flex bg-gray-600 p-2 rounded-md space-x-4">
                <h1>Active balance:</h1>
                <p>{screenState.balance} eth</p>
            </div>
        </div>
        <p className="text-white pt-4">The cost of your contract is calculated
            based on the number of your conditions,
            and how difficult the conditions are,
            as well as the cost of gas for the blockchain and the commission for
            this service in the form of 10% of the
            transaction.
            Also, the deposit you agreed on will always be taken into account.
            The deposit will be
            returned to the party that has met all the conditions, otherwise it
            will be returned to the seller.
        </p>
        {!screenState.isLedgerConnected &&
            <div className="flex items-center justify-center text-white mt-32">
                <div className="space-y-4">
                    <h1 className="text-2xl font-medium">Firstly you need to
                        connect your crypto wallet</h1>
                    <h2 className="max-w-md">If you have metamask plugin in your
                        browser, input your password and make
                        permission to this site</h2>
                    <button
                        onClick={connect}
                        className={buttonTheme + ' mt-4 w-full'}>Connect wallet
                    </button>
                </div>
            </div>}
        {screenState.isLedgerConnected &&
            <div className="flex space-x-12 justify-between items-center mt-12">
                <div className="w-[400px] relative">
                    {
                        screenState.leftPanel.isLoading && <IROBProgressBar />
                    }
                    { !screenState.leftPanel.isLoading && <div className="w-[400px]">
                        <div className="w-full bg-gray-800 text-white p-4 space-y-4 rounded-md">
                            <div className="flex justify-between">
                                <p>Requirements</p>
                                <p>{screenState.leftPanel.data.requirementsCost} eth</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Gas</p>
                                <p>{screenState.leftPanel.data.gasCost} eth</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Deposit</p>
                                <p>{screenState.leftPanel.data.depositCost} eth</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Comission</p>
                                <p>{screenState.leftPanel.data.commission} eth</p>
                            </div>
                            <div className="w-full h-0.5 bg-gray-300" />
                            <div className="flex justify-between items-center text-2xl">
                                <p>Total</p>
                                <p>{screenState.leftPanel.data.total} eth</p>
                            </div>
                        </div>
                        <button className={buttonTheme + ' w-full mt-4'}>Execute
                            transaction
                        </button>
                    </div>}
                </div>
                <div>
                    <img src={rightArrow} className="w-12 h-12" />
                </div>
                <div className="w-[400px] h-[300px] bg-gray-800 text-white p-4 rounded-xl">
                    <div className="flex w-full h-full space-y-4 justify-center items-center">
                        <p className="text-xl">Payment result will be here</p>
                    </div>
                </div>
            </div>}
    </div>
}