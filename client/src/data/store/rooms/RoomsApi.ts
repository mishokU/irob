import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRoomResponse} from "../../rooms/room/CreateRoomResponse";
import {DeleteRoomResponse} from "../../rooms/room/DeleteRoomResponse";
import {CreateRoomRequest} from "../../../features/rooms/domain/CreateRoomRequest";
import {GetRoomResponse} from "../../rooms/room/GetRoomResponse";
import {GetRoomsResponse} from "../../rooms/room/GetRoomsResponse";
import {RoomResponse} from "../../rooms/room/RoomResponse";
import {UpdateRoomRequest} from "../../../features/rooms/domain/UpdateRoomRequest";
import {UpdateRoomResult} from "../../rooms/room/UpdateRoomResult";

export const RoomsApi = createApi({
    reducerPath: "irob/api/rooms", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/rooms", headers: {
            token: localStorage.getItem("jwtToken") || "",
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
                url: `/get/${roomId}`, method: "GET",
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
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): boolean {
                return false;
            },
        }),
    }),
});

export const {
    useCreateRoomMutation, useDeleteRoomMutation, useGetRoomMutation, useGetRoomsMutation, useUpdateRoomMutation
} = RoomsApi;