import {RoomMessageResponse} from "./RoomMessagesResponse";

export interface RoomMessagesPagingResponse {
    offset: number,
    limit: number,
    messages: RoomMessageResponse[]
}