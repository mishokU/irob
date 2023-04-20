import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ServerUrl} from "../../../constants/Constants";
import {CreateContentRequest} from "../../../features/createContentModal/domain/CreateContentRequest";
import {CommonResponse} from "../../models/common/CommonResponse";
import {GetContentResponse} from "../../models/content/GetContentResponse";
import {UpdateContentRequest} from "../../../features/createContentModal/domain/UpdateContentRequest";
import {GetCatalogueItemsResponse} from "../../models/content/GetCatalogueItemsResponse";

export const ContentApi = createApi({
    reducerPath: "irob/api/content", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/content`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        createContent: builder.mutation<CommonResponse, CreateContentRequest>({
            query: (body) => ({
                url: `/create`, method: `POST`, body: body
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }),
        getContent: builder.mutation<GetContentResponse, number>({
            query: (body) => ({
                url: `/get`, method: `GET`
            }),
            transformResponse: (response: GetContentResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }),
        getCatalogueItems: builder.mutation<GetCatalogueItemsResponse, void>({
            query: (body) => ({
                url: `/getPaging`, method: `GET`
            }),
            transformResponse: (response: GetCatalogueItemsResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }),
        deleteContent: builder.mutation<CommonResponse, number>({
            query: (body) => ({
                url: `/delete`, method: `DELETE`
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }),
        updateContent: builder.mutation<CommonResponse, UpdateContentRequest>({
            query: (body) => ({
                url: `/update`, method: `POST`
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }),
    })
})

export const {
    useDeleteContentMutation,
    useCreateContentMutation,
    useGetCatalogueItemsMutation,
    useGetContentMutation,
    useUpdateContentMutation
} = ContentApi;