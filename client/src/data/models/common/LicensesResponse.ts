export interface LicensesResponse {
    licenses: LicenseResponse[]
}

export interface LicenseResponse {
    id: number,
    status: string,
    uid: string,
    name: string,
    type: string,
    owner: string,
    date: string,
    isFavourite: boolean,
    roomId: string,
    progress: number
}