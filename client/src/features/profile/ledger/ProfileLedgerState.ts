

export interface ProfileLedgerState {
    isLoading: boolean
    isLedgerConnected: boolean
    balance: number
}

export function initProfileLedgerState(isConnected: boolean): ProfileLedgerState {
    return {
        isLoading: true,
        isLedgerConnected: isConnected,
        balance: 0
    }
}