import {LicenseStatus} from "../../profile/licenses/LicenseUiModel";

export interface RoomPaymentState {
    isLedgerConnected: boolean,
    balance: number,
    leftPanel: {
        isError: string | null, isLoading: boolean
        data: {
            requirementsCost: number,
            gasCost: number,
            depositCost: number,
            commission: number,
            total: number,
            canPay: boolean,
            buttonText: string | null
        }
    }
    rightPanel: {
        isLoading: boolean,
        showIcon: boolean,
        title: string | null,
        description: string | null
    }
}

export function initialRoomPaymentState(isLedgerConnected: boolean): RoomPaymentState {
    return {
        isLedgerConnected: isLedgerConnected, balance: -1, leftPanel: {
            isLoading: true, isError: null, data: {
                requirementsCost: 0,
                gasCost: -1,
                depositCost: 0,
                commission: 0,
                total: 0,
                canPay: false,
                buttonText: null
            }
        }, rightPanel: {
            isLoading: false,
            showIcon: false,
            title: null,
            description: null
        }
    }
}