import useViewModel from "./ProfileLedgerViewModel"
import {ProfileLedgerMenuHandler} from "./ProfileLedgerMenuHandler";

export function ProfileLedgerPage() {
    const {status, connect, account, balance, onForgetAccountClick} = useViewModel()
    const {menu, setSend, setReceive} = ProfileLedgerMenuHandler()
    return <div>

        {
            status === "initializing" && <div>Synchronisation with MetaMask ongoing...</div>
        }
        {
            status === "unavailable" && <div>MetaMask not available :(</div>
        }
        {
            status === "notConnected" && <button onClick={connect}>Connect to MetaMask</button>
        }
        {
            status === "connecting" && <div>Connecting...</div>
        }
        {
            status === "connected" && <div>Connected account {account} balance {balance} eth</div>
        }
        <button onClick={onForgetAccountClick}>Удалить кошелек</button>

    </div>
}