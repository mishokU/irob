import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {GetRoomUsersResponse} from "../../models/rooms/users/GetRoomUsersResponse";
import {RoomUserResponse} from "../../models/rooms/users/RoomUserResponse";
import {ServerUrl} from "../../../constants/Constants";

export const RoomUsersApi = createApi({
    reducerPath: "irob/api/rooms/users", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/room/users`
    }), endpoints: (build) => ({
        getRoomUsers: build.mutation<RoomUserResponse[], string>({
            query: (roomId) => ({
                url: `/getUsers/${roomId}`, method: `GET`,
            }),
            transformResponse: (response: GetRoomUsersResponse) => response.users
        }),
        removeUser: build.mutation<boolean, string>({
            query: (roomId) => ({
                url: `/leave`, method: `DELETE`, roomId
            }),
        }),
        joinUser: build.mutation<boolean, any>({
            query: (body) => ({
                url: `/join`, method: `POST`, body
            })
        })
    }),
});

export const {useGetRoomUsersMutation, useRemoveUserMutation, useJoinUserMutation} = RoomUsersApi;