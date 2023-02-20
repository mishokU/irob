import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRoomResponse} from "../../rooms/room/CreateRoomResponse";
import {CreateRoomRequest} from "../../../features/rooms/domain/CreateRoomRequest";
import {CreateRequirementRequest} from "../../../features/rooms/domain/CreateRequirementRequest";
import {CreateRequirementResult} from "../../rooms/requirements/CreateRequirementResult";
import {GetRequirementsResponse} from "../../rooms/requirements/GetRequrementsResponse";
import {ApplyRequirementRequest} from "../../../features/rooms/domain/ApplyRequirementRequest";
import {DeclineRequirementRequest} from "../../../features/rooms/domain/DeclineRequirementRequest";
import {ApplyRequirementResponse} from "../../rooms/requirements/ApplyRequirementResponse";
import {DeclineRequirementResponse} from "../../rooms/requirements/DeclineRequirementResponse";

export const RoomRequirementsApi = createApi({
    reducerPath: 'irob/api/rooms/requirements', baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/room/requirements', headers: {
            token: localStorage.getItem("jwtToken") || ""
        }
    }), endpoints: build => ({
        createRequirement: build.mutation<CreateRequirementResult, CreateRequirementRequest>({
            query: (body) => ({
                url: `/create`, method: `POST`, body
            }),
            transformResponse: (response: CreateRequirementResult) => response,
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
        getRequirements: build.mutation<GetRequirementsResponse, string>({
            query: (roomId) => ({
                url: `/getAll/${roomId}`,
                method: `GET`,
                params: {roomId: roomId}
            }),
            transformResponse: (response: GetRequirementsResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get room requirements, try later."
            }
        }),
        applyRequirement: build.mutation<ApplyRequirementResponse, ApplyRequirementRequest>({
            query: (body) => ({
                url: `/apply`, method: `POST`, body
            }),
            transformResponse: (response: ApplyRequirementResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        declineRequirement: build.mutation<DeclineRequirementResponse, DeclineRequirementRequest>({
            query: (body) => ({
                url: `/decline`, method: `POST`, body
            }),
            transformResponse: (response: DeclineRequirementResponse) => response,
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