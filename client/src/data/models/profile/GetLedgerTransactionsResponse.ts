export interface GetLedgerTransactionsResponse {
    success: boolean

    transactions: LedgerTransaction[]
}

export interface LedgerTransaction {
    id: number
    date: string
    value: number
    from: string
    to: string
    contractAddress: string
    isContractCreation: boolean
}