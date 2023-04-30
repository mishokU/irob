export interface ConfigResponse {
    success: boolean
    networks: IrobNetwork[]
}

export interface IrobNetwork {
    id: number
    networkUrl: string
    chainId: number
    networkHex: string
    name: string
    isEnabled: boolean
}