import useViewModel from "./ProfileLedgerViewModel"
import {TransactionsHistoryComponent} from "../components/TransactionsHistoryComponent";
import {BalanceComponent} from "../components/BalanceComponent";
import {SendMoneyComponent} from "../send/SendMoneyComponent";
import {ProfileLedgerMenu} from "./ProfileLedgerMenu";
import {ProfileLedgerMenuHandler} from "./ProfileLedgerMenuHandler";
import {ReceiveMoneyComponent} from "../receive/ReceiveMoneyComponent";

export function ProfileLedgerPage() {
    const {
        state,
        account,
        connect,
        transactions
    } = useViewModel()
    const {menu, setSend, setReceive, setBalance} = ProfileLedgerMenuHandler()
    return <div>
        <div className="flex space-x-12">
            {menu === ProfileLedgerMenu.SEND && <SendMoneyComponent
                onBackClick={setBalance}
                maxBalance={state.balance}/>
            }
            {menu === ProfileLedgerMenu.BALANCE && <BalanceComponent
                state={state}
                connect={connect}
                onReceiveClick={setReceive}
                onSendClick={setSend}/>
            }
            {menu === ProfileLedgerMenu.RECEIVE && <ReceiveMoneyComponent
                account={account}
                onBackClick={setBalance}/>
            }
            <TransactionsHistoryComponent transactions={transactions}/>
        </div>
    </div>
}