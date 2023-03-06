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
            total: number
        }
    }
    rightPanel: {
        result: string | null
    }
}

export function initialRoomPaymentState(isLedgerConnected: boolean): RoomPaymentState {
    return {
        isLedgerConnected: isLedgerConnected, balance: 0, leftPanel: {
            isLoading: false, isError: null, data: {
                requirementsCost: 0,
                gasCost: 0,
                depositCost: 0,
                commission: 0,
                total: 0
            }
        }, rightPanel: {
            result: null
        }
    }
}