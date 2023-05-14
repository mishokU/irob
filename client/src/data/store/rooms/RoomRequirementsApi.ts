import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { CreateRequirementRequest } from "../../../features/rooms/domain/requests/CreateRequirementRequest";
import { CreateRequirementResult } from "../../models/rooms/requirements/CreateRequirementResult";
import { GetRequirementsResponse } from "../../models/rooms/requirements/GetRequrementsResponse";
import { ApplyRequirementRequest } from "../../../features/rooms/domain/requests/ApplyRequirementRequest";
import { DeclineRequirementRequest } from "../../../features/rooms/domain/requests/DeclineRequirementRequest";
import { ApplyRequirementResponse } from "../../models/rooms/requirements/ApplyRequirementResponse";
import { DeclineRequirementResponse } from "../../models/rooms/requirements/DeclineRequirementResponse";
import { GetRequirementResponse } from "../../models/rooms/requirements/GetRequirementResponse";
import { UpdateRequirementRequest } from "../../../features/rooms/domain/requests/UpdateRequirementRequest";
import { GetMakeDealResponse } from "../../models/rooms/requirements/GetMakeDealResponse";
import { GetMakeDealRequest } from "../../../features/rooms/domain/requests/GetMakeDealRequest";
import { ServerUrl } from "../../../constants/Constants";
import { CommonResponse } from "../../models/common/CommonResponse";

export const RoomRequirementsApi = createApi({
    reducerPath: 'irob/api/room/requirements', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/room/requirements`
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
                params: { requirementId: requirementId }
            }),
            transformResponse: (response: GetRequirementResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get requirement, try later."
            }
        }),
        getRequirements: build.mutation<GetRequirementsResponse, string>({
            query: (roomId) => ({
                url: `/getAll`,
                method: `GET`,
                params: { roomId: roomId }
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
        getMakeDeal: build.mutation<GetMakeDealResponse, GetMakeDealRequest>({
            query: (request) => ({
                url: `/getRequiredRequirementCount`, method: `GET`,
                params: {
                    roomId: request.roomId,
                    userId: request.userId
                }
            }),
            transformResponse: (response: GetMakeDealResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
        updateRequirement: build.mutation<CommonResponse, UpdateRequirementRequest>({
            query: (body) => ({
                url: `/update`,
                method: `POST`, body
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while creating room, try later."
            }
        }),
    })
})

export const {
    useCreateRequirementMutation,
    useGetRequirementMutation,
    useGetMakeDealMutation,
    useGetRequirementsMutation,
    useApplyRequirementMutation,
    useUpdateRequirementMutation,
    useDeclineRequirementMutation
} = RoomRequirementsApi