import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    WindowInstanceWithEthereum
} from "../../profile/ledger/ProfileLedgerViewModel";
import {
    useGetRoomRequirementsCostMutation
} from "../../../data/store/payment/RoomPaymentApi";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {initialRoomPaymentState, RoomPaymentState} from "./RoomPaymentState";

export default function RoomPaymentViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    const {status, connect, account} = useMetaMask();

    const [screenState, setScreenState] = useState<RoomPaymentState>(
        initialRoomPaymentState(status === "connected")
    )

    const [getCost, {isLoading: isUpdating}] = useGetRoomRequirementsCostMutation()

    useEffect(() => {
        async function getBalance() {
            const ethereum = (window as WindowInstanceWithEthereum).ethereum
            const balance = await ethereum.request({
                method: 'eth_getBalance', params: [account, 'latest']
            })
            // // Returns a hex value of Wei
            const wei = parseInt(balance, 16)
            const eth = (wei / Math.pow(10, 18))// parse to ETH
            setScreenState({
                ...screenState, balance: eth
            })
        }

        async function getRequirementsCost() {
            const prices = await getCost(roomReducer.roomId).unwrap()
            setScreenState({
                ...screenState, leftPanel: {
                    ...screenState.leftPanel, data: {
                        requirementsCost: prices.requirementsCost,
                        gasCost: prices.gasCost,
                        depositCost: prices.depositCost,
                        commission: prices.commissionCost,
                        total: prices.total
                    }
                }
            })
        }

        if (screenState.isLedgerConnected) {
            getBalance()
                .catch((e) => console.log(e))
                .then(getRequirementsCost)
        }
    }, [status])

    useEffect(() => {
        setScreenState({
            ...screenState, isLedgerConnected: status === "connected"
        })
    }, [status])

    useEffect(() => {
        setScreenState({
            ...screenState, leftPanel: {
                ...screenState.leftPanel, isLoading: isUpdating
            }
        })
    }, [isUpdating])

    return {
        screenState, connect
    }
}