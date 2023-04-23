import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ServerUrl} from "../../../constants/Constants";
import {VideoResponse} from "../../models/common/VideoResponse";

export const ExternalApi = createApi({
    reducerPath: "irob/api/external", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/api`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        getVideoUrl: builder.mutation<VideoResponse, string>({
            query: (body) => ({
                url: `/getVideoUrl`, method: `GET`, params: {
                    licenseKey: body
                }
            }),
            transformResponse: (response: VideoResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        })
    })
})

export const {
    useGetVideoUrlMutation
} = ExternalApi;

