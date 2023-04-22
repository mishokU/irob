export interface CreateRoomRequest {
    roomId: string
    title: string
    contentId: number | null
    userId: number | null
}