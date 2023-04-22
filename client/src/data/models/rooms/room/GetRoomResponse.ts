export interface GetRoomResponse {
    roomName: string
    isAdmin: boolean
    roomId: string
    ownerId: number
    contentId: number
    firstAgreement: boolean
    userId: number
    secondAgreement: boolean
}