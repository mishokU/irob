import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    useUpdateLedgerAccountMutation
} from "../../../data/store/profile/ProfileApi";

export default function ProfileLedgerViewModel() {

    const {status, connect, account } = useMetaMask();

    const [balance, setBalance] = useState(0)
    const [isLedgerConnected, setIsLedgerConnected] = useState(status === "connected")

    const [updateAccountLedgerMutation] = useUpdateLedgerAccountMutation()

    useEffect(() => {
        async function getBalance() {
            if(account !== null){
                const response = await updateAccountLedgerMutation({account: account}).unwrap()
                const balance = response.balance.toFixed(2)
                setBalance(Number(balance))
                setIsLedgerConnected(status === "connected")
            } else {
                setIsLedgerConnected(false)
            }
        }

        getBalance().catch((e) => console.log(e))
    }, [status])

    function onForgetAccountClick() {

    }

    function onReceiveClick() {

    }

    function onSendClick() {

    }

    return {
        isLedgerConnected, status, balance, onForgetAccountClick, connect, onReceiveClick, onSendClick
    }

}