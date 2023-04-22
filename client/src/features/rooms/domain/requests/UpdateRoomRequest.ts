export interface UpdateRoomRequest {
    roomId : string,
    name : string,
    ownerId: number,
    //id of new admin
    userId: number
}