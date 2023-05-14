import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {GetRoomRequirementsCostResponse} from "../../models/rooms/payment/GetRoomRequirementsCostResponse";
import {RoomPaymentRequest} from "../../../features/rooms/domain/requests/RoomPaymentRequest";
import {CreateLicenseRequest} from "../../../features/rooms/domain/requests/CreateLicenseRequest";
import {CreateLicenseResult} from "../../models/payment/CreateLicenseResult";
import {GetRoomResult} from "../../models/rooms/payment/GetRoomResult";
import {GetContractDataResult} from "../../models/payment/GetContractDataResult";
import {GetContractDataRequest} from "../../../features/rooms/domain/requests/GetContractDataRequest";
import {ServerUrl} from "../../../constants/Constants";

export const RoomPaymentApi = createApi({
    reducerPath: "irob/api/room/payment", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/room/payment`
    }), endpoints: (builder) => ({
        getRoomRequirementsCost: builder.mutation<GetRoomRequirementsCostResponse, RoomPaymentRequest>({
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
        createLicense: builder.mutation<CreateLicenseResult, CreateLicenseRequest>({
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
        }),
        getContractData: builder.mutation<GetContractDataResult, GetContractDataRequest>({
            query: (body) => ({
                url: `/contractData`, method: `GET`, params: {
                    roomId: body.roomId, ownerId: body.ownerId, userId: body.userId
                }
            }),
            transformResponse: (response: GetContractDataResult) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        })
    }),
});

export const {
    useGetRoomRequirementsCostMutation, useCreateLicenseMutation, useGetRoomResultMutation, useGetContractDataMutation
} = RoomPaymentApi;