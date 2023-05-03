export interface GetLedgerTransactionsResponse {
    success: boolean

    transactions: LedgerTransaction[]
}

export interface LedgerTransaction {
    date: string
    value: number
    from: string
    to: string
    contractAddress: string
    isContractCreation: boolean
}