import {RoomMessageResponse} from "./RoomMessagesResponse";

export interface RoomMessagesPagingResponse {
    offset: number,
    messages: RoomMessageResponse[]
}