import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RoomMessagesPagingResponse} from "../../models/rooms/messenger/RoomMessagesPagingResponse";
import {GetRoomMessagesRequest} from "../../../features/rooms/domain/requests/GetRoomMessagesRequest";
import {ServerUrl} from "../../../constants/Constants";

export const RoomMessengerApi = createApi({
    reducerPath: "irob/api/room/messages", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/room/messages`
    }), endpoints: (build) => ({
        getRoomMessages: build.mutation<RoomMessagesPagingResponse, GetRoomMessagesRequest>({
            query: (body) => ({
                url: `/getMessages`, method: `GET`, params: {
                    roomId: body.roomId, offset: body.offset
                }
            }),
            transformResponse: (response: RoomMessagesPagingResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get room messages, try later."
            }
        }),
    }),
});

export const {useGetRoomMessagesMutation} = RoomMessengerApi;