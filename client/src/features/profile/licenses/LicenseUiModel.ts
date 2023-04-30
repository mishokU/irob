export interface LicenseUiModel {
    status: LicenseStatus
    name: string
    type: string
    owner: string
    date: string
    progress: number
    address: string
    roomId: string
    userId: number
    id: number
    uid: string
    isFavourite: boolean
    isUidVisible: boolean
    isPrivateKeyButtonVisible: boolean
    isProgressVisible: boolean
}

export enum ClickType {
    'updateFavourite',
    'updateVisibility'
}

export enum LicenseStatus {
    'running',
    'success',
    'expired',
    'canceled'
}

export function getLicenseStatus(status: string): LicenseStatus | null {
    if(status === "running"){
        return LicenseStatus.running
    } else if(status === "success") {
        return LicenseStatus.success
    } else if(status === "expired") {
        return LicenseStatus.expired
    } else if(status === "canceled") {
        return LicenseStatus.canceled
    } else {
        return null
    }
}