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
    isClaimRewardVisible: boolean
    isPrivateKeyButtonVisible: boolean
    isProgressVisible: boolean
}

export enum ClickType {
    'updateFavourite',
    'updateVisibility',
    'claimReward'
}

export enum LicenseStatus {
    'running',
    'success',
    'claimed',
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
    } else if(status === "claimed") {
        return LicenseStatus.claimed
    } else {
        return null
    }
}