import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {WindowInstanceWithEthereum} from "../../../profile/ledger/ProfileLedgerViewModel";

export default function RoomPaymentViewModel() {

    const {status, connect, account } = useMetaMask();
    const [isLedgerConnected, setIsLedgerConnected] = useState(status === "connected")
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        async function getBalance() {
            const ethereum = (window as WindowInstanceWithEthereum).ethereum
            const balance = await ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
            // // Returns a hex value of Wei
            const wei = parseInt(balance, 16)
            const eth = (wei / Math.pow(10, 18))// parse to ETH
            setBalance(eth)
        }

        if(isLedgerConnected){
            getBalance().catch((e) => console.log(e))
        }
    }, [status])

    useEffect(() => {
        setIsLedgerConnected(status === "connected")
    }, [status])

    return {
        isLedgerConnected,
        balance,
        connect
    }
}