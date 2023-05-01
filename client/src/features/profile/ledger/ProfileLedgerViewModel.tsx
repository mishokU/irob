import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    useUpdateLedgerAccountMutation
} from "../../../data/store/profile/ProfileApi";
import { ProfileLedgerState, initProfileLedgerState } from "./ProfileLedgerState";

export default function ProfileLedgerViewModel() {

    const {status, connect, account } = useMetaMask();

    const [state, setState] = useState<ProfileLedgerState>(initProfileLedgerState(status === "connected"))

    const [updateAccountLedgerMutation] = useUpdateLedgerAccountMutation()

    useEffect(() => {
        async function getBalance() {
            if(account !== null){
                const response = await updateAccountLedgerMutation({account: account}).unwrap()
                const balance = response.balance.toFixed(4)
                setState({
                    isLoading: false,
                    balance: Number(balance),
                    isLedgerConnected: status === "connected"
                })
            } else {
                setState({
                    ...state,
                    isLedgerConnected: false
                })
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
        status, 
        state, 
        onForgetAccountClick, 
        connect, 
        onReceiveClick, 
        onSendClick
    }

}