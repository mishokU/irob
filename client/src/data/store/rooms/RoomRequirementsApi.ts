import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRoomResponse} from "../../rooms/CreateRoomResponse";
import {CreateRoomRequest} from "../../../features/rooms/domain/CreateRoomRequest";

export const RoomRequirementsApi = createApi({
    reducerPath: 'irob/api/rooms/requirements', baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/rooms/requirements', headers: {
            token: localStorage.getItem("jwtToken") || ""
        }
    }), endpoints: build => ({
        createRequirement: build.mutation<string, CreateRoomRequest>({
            query: (body) => ({
                url: `/create`, method: `POST`, body
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        getRequirement: build.mutation<string, CreateRoomRequest>({
            query: (roomId) => ({
                url: `/get/${roomId}`, method: `GET`
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        getRequirements: build.mutation<string, CreateRoomRequest>({
            query: (roomId) => ({
                url: `/getAll/${roomId}`, method: `GET`
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        applyRequirement: build.mutation<string, CreateRoomRequest>({
            query: (body) => ({
                url: `/apply`, method: `POST`, body
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        declineRequirement: build.mutation<string, CreateRoomRequest>({
            query: (body) => ({
                url: `/decline`, method: `POST`, body
            }),
            transformResponse: (response: CreateRoomResponse) => response.roomId,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        })
    })
})

export const {
    useCreateRequirementMutation,
    useGetRequirementMutation,
    useGetRequirementsMutation,
    useApplyRequirementMutation,
    useDeclineRequirementMutation
} = RoomRequirementsApi