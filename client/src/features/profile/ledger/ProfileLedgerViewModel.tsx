import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";

export type WindowInstanceWithEthereum = Window & typeof globalThis & { ethereum?: any };

export default function ProfileLedgerViewModel() {

    const {status, connect, account } = useMetaMask();
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

        getBalance().catch((e) => console.log(e))
    }, [])

    function onForgetAccountClick() {

    }

    return {
        account, status, balance, onForgetAccountClick, connect
    }

}