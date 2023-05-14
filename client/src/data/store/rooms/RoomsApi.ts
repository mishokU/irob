import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRoomResponse} from "../../models/rooms/room/CreateRoomResponse";
import {CreateRoomRequest} from "../../../features/rooms/domain/requests/CreateRoomRequest";
import {GetRoomResponse} from "../../models/rooms/room/GetRoomResponse";
import {GetRoomsResponse} from "../../models/rooms/room/GetRoomsResponse";
import {RoomResponse} from "../../models/rooms/room/RoomResponse";
import {UpdateRoomRequest} from "../../../features/rooms/domain/requests/UpdateRoomRequest";
import {UpdateRoomResult} from "../../models/rooms/room/UpdateRoomResult";
import {HandleAgreementRequest} from "../../../features/rooms/domain/requests/HandleAgreementRequest";
import {MakeDealResponse} from "../../models/rooms/users/MakeDealResponse";
import {ServerUrl} from "../../../constants/Constants";
import {GetContentIdResponse} from "../../models/rooms/room/GetContentIdResponse";
import {CommonResponse} from "../../models/common/CommonResponse";
import {CommonErrorResponse} from "../../models/common/CommonErrorResponse";

export const RoomsApi = createApi({
    reducerPath: "irob/api/rooms", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/rooms`
    }), endpoints: (build) => ({
        createRoom: build.mutation<string, CreateRoomRequest>({
            query: (body) => ({
                url: `/create`, method: `POST`, body
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId
        }),
        getRoom: build.mutation<GetRoomResponse, string>({
            query: (roomId) => ({
                url: `/get/${roomId}`,
                method: "GET",
                params: {roomId: roomId}
            }),
            transformResponse: (response: GetRoomResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): CommonErrorResponse {
                return {message: "Error in get room!", success: false};
            },
        }),
        getRooms: build.mutation<RoomResponse[], void>({
            query: () => ({
                url: `/getRooms`, method: "GET",
            }),
            transformResponse: (response: GetRoomsResponse) => response.rooms,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error get rooms response";
            },
        }),
        deleteRoom: build.mutation<CommonResponse, string>({
            query: (roomId) => ({
                url: "/delete", method: `DELETE`, params: {roomId: roomId},
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): boolean {
                return false;
            },
        }),
        updateRoom: build.mutation<UpdateRoomResult, UpdateRoomRequest>({
            query: (body) => ({
                url: "/update", method: `POST`, body
            }),
            transformResponse: (response: UpdateRoomResult) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                return "Error while updating room";
            }
        }),
        handleAgreement: build.mutation<MakeDealResponse, HandleAgreementRequest>({
            query: (body) => ({
                url: "/agreement", method: `POST`, body
            }),
            transformResponse: (response: MakeDealResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                return "Error while updating room";
            }
        }),
        getContentId: build.mutation<GetContentIdResponse, string>({
            query: (body) => ({
                url: "/getContentId", method: `GET`, params: {
                    roomId: body
                }
            }),
            transformResponse: (response: GetContentIdResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                return "Error while updating room";
            }
        }),
    }),
});

export const {
    useCreateRoomMutation,
    useDeleteRoomMutation,
    useGetRoomMutation,
    useGetRoomsMutation,
    useGetContentIdMutation,
    useUpdateRoomMutation
} = RoomsApi;