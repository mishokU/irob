import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    useGetLedgerTransactionsMutation,
    useUpdateLedgerAccountMutation
} from "../../../data/store/profile/ProfileApi";
import {ProfileLedgerState, initProfileLedgerState} from "./ProfileLedgerState";
import {LedgerTransaction} from "../../../data/models/profile/GetLedgerTransactionsResponse";

export default function ProfileLedgerViewModel() {


    const {status, connect, account} = useMetaMask();

    const [state, setState] = useState<ProfileLedgerState>(initProfileLedgerState(status === "connected", account !== null))
    const [transactions, setTransactions] = useState<LedgerTransaction[]>([])

    const [updateAccountLedgerMutation] = useUpdateLedgerAccountMutation()
    const [getLedgerTransactions] = useGetLedgerTransactionsMutation()

    useEffect(() => {
        async function getBalance() {
            if (account !== null) {
                const response = await updateAccountLedgerMutation({account: account}).unwrap()
                const balance = response.balance
                setState({
                    isLoading: false,
                    balance: Number(balance),
                    isLedgerConnected: status === "connected"
                })
            } else {
                setState({
                    ...state,
                    isLedgerConnected: false,
                    isLoading: false
                })
            }
        }

        getBalance().catch((e) => console.log(e))

    }, [status])

    useEffect(() => {

        async function fetch() {
            if (account) {
                return await getLedgerTransactions(account).unwrap()
            }
        }

        fetch()
            .catch((error) => console.log(error))
            .then((response: any) => {
                if(response){
                    setTransactions(response.transactions)
                }
            })

    }, [])


    function onForgetAccountClick() {

    }

    function onReceiveClick() {

    }

    function onSendClick() {

    }

    return {
        status,
        state,
        transactions,
        onForgetAccountClick,
        connect,
        onReceiveClick,
        onSendClick
    }

}