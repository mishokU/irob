export interface ConfigResponse {
    success: boolean
    networks: IrobNetwork[]
}

export interface IrobNetwork {
    id: number
    chainId: number
    networkHex: string
    name: string
    isEnabled: boolean
}