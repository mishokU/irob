import {RoomPrices} from "./RoomPrices";

export interface GetRoomResult {
    success: boolean,
    licenseStatus: string,
    roomPrices: RoomPrices | null
}