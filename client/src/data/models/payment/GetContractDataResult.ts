
export interface GetContractDataResult {
    success: boolean
    message: string
    buyerAddress: string
    sellerAddress: string
    commissionAddress: string
    contractCost: number
    canPay: boolean
    data: string
}