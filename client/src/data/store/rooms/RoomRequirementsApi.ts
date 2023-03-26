import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {CreateRequirementRequest} from "../../../features/rooms/domain/CreateRequirementRequest";
import {CreateRequirementResult} from "../../models/rooms/requirements/CreateRequirementResult";
import {GetRequirementsResponse} from "../../models/rooms/requirements/GetRequrementsResponse";
import {ApplyRequirementRequest} from "../../../features/rooms/domain/ApplyRequirementRequest";
import {DeclineRequirementRequest} from "../../../features/rooms/domain/DeclineRequirementRequest";
import {ApplyRequirementResponse} from "../../models/rooms/requirements/ApplyRequirementResponse";
import {DeclineRequirementResponse} from "../../models/rooms/requirements/DeclineRequirementResponse";
import {GetRequirementResponse} from "../../models/rooms/requirements/GetRequirementResponse";
import {UpdateRequirementRequest} from "../../models/rooms/requirements/UpdateRequirementRequest";
import {GetRequiredRequiremensCountResponse} from "../../models/rooms/requirements/GetRequiredRequiremensCountResponse";

export const RoomRequirementsApi = createApi({
    reducerPath: 'irob/api/room/requirements', baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/room/requirements',
        prepareHeaders: (headers, { getState }) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
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
        getRequirement: build.mutation<GetRequirementResponse, number>({
            query: (requirementId) => ({
                url: `/get`,
                method: `GET`,
                params: {requirementId: requirementId}
            }),
            transformResponse: (response: GetRequirementResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        getRequirements: build.mutation<GetRequirementsResponse, string>({
            query: (roomId) => ({
                url: `/getAll`,
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
        }),
        getRequiredRequirementsCount: build.mutation<GetRequiredRequiremensCountResponse, string>({
            query: (roomId) => ({
                url: `/getRequiredRequirementCount`, method: `GET`,
                params: {roomId: roomId}
            }),
            transformResponse: (response: GetRequiredRequiremensCountResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        updateRequirement: build.mutation<GetRequirementResponse, UpdateRequirementRequest>({
            query: (body) => ({
                url: `/update`,
                method: `POST`, body
            }),
            transformResponse: (response: GetRequirementResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
    })
})

export const {
    useCreateRequirementMutation,
    useGetRequirementMutation,
    useGetRequiredRequirementsCountMutation,
    useGetRequirementsMutation,
    useApplyRequirementMutation,
    useUpdateRequirementMutation,
    useDeclineRequirementMutation
} = RoomRequirementsApi