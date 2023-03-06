import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {GetRoomRequirementsCostResponse} from "../../models/rooms/payment/GetRoomRequirementsCostResponse";

export const RoomPaymentApi = createApi({
    reducerPath: "irob/api/room/payment", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/room/payment",
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        getRoomRequirementsCost: builder.mutation<GetRoomRequirementsCostResponse, string>({
            query: (body) => ({
                url: `/cost`,
                method: `GET`,
                params: {
                    roomId: body
                }
            }),
            transformResponse: (response: GetRoomRequirementsCostResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get room messages, try later."
            }
        }),
    }),
});

export const {useGetRoomRequirementsCostMutation} = RoomPaymentApi;