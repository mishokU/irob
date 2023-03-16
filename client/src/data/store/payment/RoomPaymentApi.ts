import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {
    GetRoomRequirementsCostResponse
} from "../../models/rooms/payment/GetRoomRequirementsCostResponse";
import {
    RoomPaymentRequest
} from "../../../features/rooms/domain/RoomPaymentRequest";
import {
    CreateLicenseRequest
} from "../../../features/rooms/domain/CreateLicenseRequest";
import {CreateLicenseResult} from "../../models/payment/CreateLicenseResult";
import {RoomPrices} from "../../models/rooms/payment/RoomPrices";
import {GetRoomResult} from "../../models/rooms/payment/GetRoomResult";

export const RoomPaymentApi = createApi({
    reducerPath: "irob/api/room/payment", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/room/payment",
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        getRoomRequirementsCost: builder.mutation<GetRoomRequirementsCostResponse, RoomPaymentRequest>(
            {
                query: (body) => ({
                    url: `/cost`, method: `GET`, params: {
                        roomId: body.roomId, userId: body.userId
                    }
                }),
                transformResponse: (response: GetRoomRequirementsCostResponse) => response,
                transformErrorResponse(meta: unknown, arg: unknown): string {
                    return "Error while getRoomRequirementsCost, try later."
                }
            }),
        createLicense: builder.mutation<CreateLicenseResult, CreateLicenseRequest>(
            {
                query: (body) => ({
                    url: `/create`, method: `POST`, body
                }),
                transformResponse: (response: CreateLicenseResult) => response,
                transformErrorResponse(meta: unknown, arg: unknown): string {
                    return "Error while getRoomRequirementsCost, try later."
                }
            }),
        getRoomResult: builder.mutation<GetRoomResult, string>({
            query: (roomId) => ({
                url: `/result`, method: `GET`, params: {
                    roomId: roomId
                }
            }),
            transformResponse: (response: GetRoomResult) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        })
    }),
});

export const {
    useGetRoomRequirementsCostMutation, useCreateLicenseMutation, useGetRoomResultMutation
} = RoomPaymentApi;