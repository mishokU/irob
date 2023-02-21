import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {GetRoomUsersResponse} from "../../rooms/users/GetRoomUsersResponse";
import {RoomUserResponse} from "../../rooms/users/RoomUserResponse";

export const RoomUsersApi = createApi({
    reducerPath: "irob/api/rooms/users", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/room/users", headers: {
            token: localStorage.getItem("jwtToken") || "",
        },
    }), endpoints: (build) => ({
        getRoomUsers: build.mutation<RoomUserResponse[], string>({
            query: (roomId) => ({
                url: `/getUsers/${roomId}`, method: `GET`,
            }),
            transformResponse: (response: GetRoomUsersResponse) => response.users,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get room users";
            },
        }), removeUser: build.mutation<boolean, string>({
            query: (roomId) => ({
                url: `/leave`, method: `DELETE`, roomId
            }),
        }), joinUser: build.mutation<boolean, any>({
            query: (body) => ({
                url: `/join`, method: `POST`, body
            }),
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while join user to room";
            },
        })
    }),
});

export const {useGetRoomUsersMutation, useRemoveUserMutation, useJoinUserMutation} = RoomUsersApi;