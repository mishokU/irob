import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    useCreateLicenseMutation, useGetContractDataMutation, useGetRoomRequirementsCostMutation, useGetRoomResultMutation
} from "../../../data/store/payment/RoomPaymentApi";
import {useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {initialRoomPaymentState, RoomPaymentState} from "./RoomPaymentState";
import {
    useUpdateLedgerAccountMutation
} from "../../../data/store/profile/ProfileApi";
import {RoomPrices} from "../../../data/models/rooms/payment/RoomPrices";
import {ButtonType} from "./ButtonType";
import {
    GetRoomRequirementsCostResponse
} from "../../../data/models/rooms/payment/GetRoomRequirementsCostResponse";
import {
    getLicenseStatus, LicenseStatus
} from "../../profile/licenses/LicenseUiModel";
import {isMetamaskAvailable} from "../../../domain/web3/isMetamaskAvailable";
import {signAndCreateContract} from "../../../domain/web3/signAndCreateContract";
import {signAndSendDeposit} from "../../../domain/web3/signAndSendDeposit";

export default function RoomPaymentViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)
    const configReducer = useSelector((state: RootState) => state.config)

    const {status, connect, account} = useMetaMask();

    const [screenState, setScreenState] = useState<RoomPaymentState>(initialRoomPaymentState(status === "connected"))

    const [getCost, {isLoading: isUpdating}] = useGetRoomRequirementsCostMutation()
    const [updateAccountLedgerMutation] = useUpdateLedgerAccountMutation()
    const [createLicenseMutation] = useCreateLicenseMutation()
    const [getContractData] = useGetContractDataMutation()
    const [getRoomResult] = useGetRoomResultMutation()

    useEffect(() => {
        async function getBalance() {
            if (account !== null) {

                const roomResult = await getRoomResult(roomReducer.roomId).unwrap()
                const response = await updateAccountLedgerMutation({account: account}).unwrap()

                if (roomResult.roomPrices === null) {

                    const prices = await getCost({
                        roomId: roomReducer.roomId, userId: roomReducer.userId
                    }).unwrap()

                    updateScreenState(response.balance,
                        prices.roomPrices,
                        resolveButtonType(response.balance, prices),
                        null)

                } else {
                    updateScreenState(response.balance,
                        roomResult.roomPrices,
                        ButtonType.Executed,
                        getLicenseStatus(roomResult.licenseStatus))
                }
            }
        }

        if (screenState.isLedgerConnected) {
            getBalance().catch((e) => console.log(e))
        }

    }, [screenState.isLedgerConnected])

    useEffect(() => {
        setScreenState({
            ...screenState, isLedgerConnected: status === "connected", leftPanel: {
                ...screenState.leftPanel, isLoading: true
            }
        })
    }, [status])

    useEffect(() => {
        setScreenState({
            ...screenState, leftPanel: {
                ...screenState.leftPanel, isLoading: isUpdating
            }
        })
    }, [isUpdating])

    /*
        First sign and create contract with deposit
        Then pay to seller
    */

    const handleTransaction = async () => {
        try {
            loading()
            if (isMetamaskAvailable()) {

                const result = await getContractData({
                    roomId: roomReducer.roomId, ownerId: roomReducer.ownerId, userId: roomReducer.userId
                }).unwrap()

                if (result.success === false) {
                    error(result.message)
                } else {

                    const cost = screenState.leftPanel.data.contractCost.toString()
                    const deposit = screenState.leftPanel.data.depositCost.toString()

                    console.log(result.buyerAddress)
                    console.log(cost)
                    console.log(deposit)

                    const contractAddress = await signAndCreateContract(result.buyerAddress, result.data, deposit)

                    /*
                        Need to save transfer cost
                    */
                    const sendDepositResult = await signAndSendDeposit(result.sellerAddress, cost)

                    const createLicenseResponse = await createLicenseMutation({
                        roomId: roomReducer.roomId,
                        ownerId: roomReducer.ownerId,
                        userId: roomReducer.userId,
                        contractAddress: contractAddress
                    }).unwrap()

                    const updatedBalance = Number(screenState.balance) - Number(deposit) - Number(cost)

                    if (createLicenseResponse.success === false) {
                        error(createLicenseResponse.message)
                    } else {
                        successCreation(createLicenseResponse.title, createLicenseResponse.description, updatedBalance)
                    }

                }
            }

        } catch (e: any) {
            console.log(e)
            error(e.message)
        }
    }

    function loading() {
        setScreenState({
            ...screenState, leftPanel: {
                ...screenState.leftPanel, data: {
                    ...screenState.leftPanel.data, canPay: false
                }
            }, rightPanel: {
                ...screenState.rightPanel, isLoading: true,
            }
        })
    }

    function error(message: string | null) {
        setScreenState({
            ...screenState, leftPanel: {
                ...screenState.leftPanel, data: {
                    ...screenState.leftPanel.data,
                    canPay: true,
                    buttonText: getButtonText(ButtonType.ExecuteTransaction)
                }
            }, rightPanel: {
                isLoading: false, showIcon: false, title: message, description: ""
            }
        })
    }

    function successCreation(title: string, description: string, updatedBalance: number) {
        setScreenState({
            ...screenState,
            balance: updatedBalance,
            leftPanel: {
                ...screenState.leftPanel, data: {
                    ...screenState.leftPanel.data, canPay: false, buttonText: getButtonText(ButtonType.Executed)
                }
            }, rightPanel: {
                isLoading: false, showIcon: true, title: title, description: description
            }
        })
    }

    function updateScreenState(balance: number, prices: RoomPrices, buttonType: ButtonType,
                               licenseStatus: LicenseStatus | null) {
        setScreenState({
            ...screenState, balance: balance, leftPanel: {
                ...screenState.leftPanel, isLoading: false, data: {
                    contractCost: prices.contractCost,
                    gasCost: prices.gasCost,
                    depositCost: prices.depositCost,
                    commission: prices.commissionCost,
                    total: prices.total,
                    canPay: balance > prices.total && account !== null && buttonType === ButtonType.ExecuteTransaction,
                    buttonText: getButtonText(buttonType)
                }
            }, rightPanel: resolveRightPanel(buttonType, licenseStatus)
        })
    }

    function resolveButtonType(balance: number, response: GetRoomRequirementsCostResponse) {
        if (balance < response.roomPrices.total) {
            return ButtonType.NotEnoughMoney
        } else if (response.secondAccount === null) {
            return ButtonType.TheBuyerDidNotLinkTheWallet
        } else {
            return ButtonType.ExecuteTransaction
        }
    }

    function getButtonText(buttonType: ButtonType) {
        if (buttonType === ButtonType.NotEnoughMoney) {
            return "Not enough money"
        } else if (buttonType === ButtonType.TheBuyerDidNotLinkTheWallet) {
            return "The seller did not link the wallet"
        } else if (buttonType === ButtonType.ExecuteTransaction) {
            return "Execute transaction"
        } else {
            return "Executed"
        }
    }

    function resolveRightPanel(button: ButtonType, licenseStatus: LicenseStatus | null) {
        if (button === ButtonType.Executed) {
            return {
                showIcon: true,
                isLoading: false,
                title: "Congratulations with your deal!",
                description: resolveDescription(licenseStatus)
            }
        } else {
            return {
                showIcon: false, isLoading: false, title: "Payment result will be here", description: null
            }
        }
    }

    function resolveDescription(licenseStatus: LicenseStatus | null) {
        if (licenseStatus === LicenseStatus.running) {
            return "Now you can check your license at the profile page"
        } else if (licenseStatus === LicenseStatus.success) {
            return "License ends with success! Congratulations!"
        } else {
            return "Oooops, your license end with failure"
        }
    }

    return {
        screenState, connect, handleTransaction
    }
}