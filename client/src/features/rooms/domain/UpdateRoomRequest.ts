export interface UpdateRoomRequest {
    roomId : string,
    name : string,
    ownerId: number,
    //id of new admin
    userId: number,
    //Content owner
    owner: string,
    //Content type like: movie, serial or smt
    type: string
}