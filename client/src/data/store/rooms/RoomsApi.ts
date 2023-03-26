import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRoomResponse} from "../../models/rooms/room/CreateRoomResponse";
import {DeleteRoomResponse} from "../../models/rooms/room/DeleteRoomResponse";
import {CreateRoomRequest} from "../../../features/rooms/domain/CreateRoomRequest";
import {GetRoomResponse} from "../../models/rooms/room/GetRoomResponse";
import {GetRoomsResponse} from "../../models/rooms/room/GetRoomsResponse";
import {RoomResponse} from "../../models/rooms/room/RoomResponse";
import {UpdateRoomRequest} from "../../../features/rooms/domain/UpdateRoomRequest";
import {UpdateRoomResult} from "../../models/rooms/room/UpdateRoomResult";
import {HandleAgreementRequest} from "../../../features/rooms/domain/HandleAgreementRequest";
import {MakeDealResponse} from "../../models/rooms/users/MakeDealResponse";

export const RoomsApi = createApi({
    reducerPath: "irob/api/rooms", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/rooms",
        prepareHeaders: (headers, { getState }) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (build) => ({
        createRoom: build.mutation<string, CreateRoomRequest>({
            query: (body) => ({
                url: `/create`, method: `POST`, body,
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later.";
            },
        }), getRoom: build.mutation<GetRoomResponse, string>({
            query: (roomId) => ({
                url: `/get/${roomId}`,
                method: "GET",
                params: {roomId: roomId}
            }),
            transformResponse: (response: GetRoomResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error get room response";
            },
        }), getRooms: build.mutation<RoomResponse[], void>({
            query: () => ({
                url: `/getRooms`, method: "GET",
            }),
            transformResponse: (response: GetRoomsResponse) => response.rooms,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error get rooms response";
            },
        }), deleteRoom: build.mutation<boolean, string>({
            query: (roomId) => ({
                url: "/delete", method: `DELETE`, params: {roomId: roomId},
            }),
            transformResponse: (response: DeleteRoomResponse) => response.success,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): boolean {
                return false;
            },
        }), updateRoom: build.mutation<UpdateRoomResult, UpdateRoomRequest>({
            query: (body) => ({
                url: "/update", method: `POST`, body
            }),
            transformResponse: (response: UpdateRoomResult) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                return "Error while updating room";
            }
        }), handleAgreement: build.mutation<MakeDealResponse, HandleAgreementRequest>({
            query: (body) => ({
                url: "/agreement", method: `POST`, body
            }),
            transformResponse: (response: MakeDealResponse) => response,
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
    useUpdateRoomMutation,
    useHandleAgreementMutation
} = RoomsApi;