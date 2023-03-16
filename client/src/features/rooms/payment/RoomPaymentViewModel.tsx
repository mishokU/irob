import {useMetaMask} from "metamask-react";
import {useEffect, useState} from "react";
import {
    useCreateLicenseMutation,
    useGetRoomRequirementsCostMutation,
    useGetRoomResultMutation
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
} from "../../profile/licenseType/LicenseUiModel";

export default function RoomPaymentViewModel() {

    const roomReducer = useSelector((state: RootState) => state.room)

    const {status, connect, account} = useMetaMask();

    const [screenState, setScreenState] = useState<RoomPaymentState>(
        initialRoomPaymentState(status === "connected"))

    const [getCost, {isLoading: isUpdating}] = useGetRoomRequirementsCostMutation()
    const [updateAccountLedgerMutation] = useUpdateLedgerAccountMutation()
    const [createLicenseMutation] = useCreateLicenseMutation()
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

                    updateScreenState(
                        response.balance,
                        prices.roomPrices,
                        resolveButtonType(response.balance, prices), null
                    )

                } else {
                    updateScreenState(
                        response.balance,
                        roomResult.roomPrices,
                        ButtonType.Executed,
                        getLicenseStatus(roomResult.licenseStatus)
                    )
                }
            }
        }

        if (screenState.isLedgerConnected) {
            getBalance().catch((e) => console.log(e))
        }
    }, [screenState.isLedgerConnected])

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

    const handleTransaction = async () => {
        try {

            setScreenState({
                ...screenState,
                leftPanel: {
                    ...screenState.leftPanel,
                    data: {
                        ...screenState.leftPanel.data,
                        canPay: false
                    }
                },
                rightPanel: {
                    ...screenState.rightPanel, isLoading: true,
                }
            })

            const result = await createLicenseMutation({
                roomId: roomReducer.roomId,
                ownerId: roomReducer.ownerId,
                userId: roomReducer.userId
            }).unwrap()

            setScreenState({
                ...screenState,
                leftPanel: {
                    ...screenState.leftPanel,
                    data: {
                        ...screenState.leftPanel.data,
                        canPay: false,
                        buttonText: getButtonText(ButtonType.Executed)
                    }
                },
                rightPanel: {
                    isLoading: false,
                    showIcon: true,
                    title: result.title,
                    description: result.description
                }
            })

        } catch (e) {
            console.log(e)
        }
    }

    function updateScreenState(balance: number, prices: RoomPrices,
        buttonType: ButtonType, licenseStatus: LicenseStatus | null) {
        setScreenState({
            ...screenState, balance: balance, leftPanel: {
                ...screenState.leftPanel, isLoading: false, data: {
                    requirementsCost: prices.requirementsCost,
                    gasCost: prices.gasCost,
                    depositCost: prices.depositCost,
                    commission: prices.commissionCost,
                    total: prices.total,
                    canPay: balance > prices.total && account !== null && buttonType !== ButtonType.Executed,
                    buttonText: getButtonText(buttonType)
                }
            }, rightPanel: resolveRightPanel(buttonType, licenseStatus)
        })
    }

    function resolveButtonType(balance: number,
        response: GetRoomRequirementsCostResponse) {
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
            return "The buyer did not link the wallet"
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
                showIcon: false,
                isLoading: false,
                title: "Payment result will be here",
                description: null
            }
        }
    }

    function resolveDescription(licenseStatus: LicenseStatus | null){
        if(licenseStatus === LicenseStatus.running){
            return "Now you can check your license at the profile page"
        } else if(licenseStatus === LicenseStatus.success){
            return "License ends with success! Congratulations!"
        } else {
            return "Oooops, your license end with failure"
        }
    }

    return {
        screenState, connect, handleTransaction
    }
}