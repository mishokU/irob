export interface GetRoomResponse {
    success: boolean
    message: string | null
    roomName: string
    isAdmin: boolean
    roomId: string
    ownerId: number
    contentId: number
    firstAgreement: boolean
    userId: number
    secondAgreement: boolean
}