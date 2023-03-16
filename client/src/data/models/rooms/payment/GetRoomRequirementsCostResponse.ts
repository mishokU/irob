import {RoomPrices} from "./RoomPrices";

export interface GetRoomRequirementsCostResponse {
    success: boolean
    secondAccount: string | null
    roomPrices: RoomPrices
}