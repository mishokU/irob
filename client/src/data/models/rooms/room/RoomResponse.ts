export interface RoomResponse {
    roomId: string
    isActive: boolean
    title: string
    owner: string
    type: string
    ownerName: string
    lastMessage: string
    lastMessageDate: string
    requirements: string
}