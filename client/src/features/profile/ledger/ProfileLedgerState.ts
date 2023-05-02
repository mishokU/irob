

export interface ProfileLedgerState {
    isLoading: boolean
    isLedgerConnected: boolean
    balance: number
}

export function initProfileLedgerState(isConnected: boolean, hasAccount: boolean): ProfileLedgerState {
    return {
        isLoading: !hasAccount,
        isLedgerConnected: isConnected,
        balance: 0
    }
}