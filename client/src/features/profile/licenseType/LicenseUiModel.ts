export interface LicenseUiModel {
    status: LicenseStatus
    name: string
    owner: string
    date: string
    progress: number
    roomId: string
    id: number
    uid: string
    isFavourite: boolean
    isUidVisible: boolean
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