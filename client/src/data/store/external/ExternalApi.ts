import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ServerUrl} from "../../../constants/Constants";

export const ExternalApi = createApi({
    reducerPath: "irob/api/external", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/api`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        getVideoUrl: builder.mutation<any, string>({
            query: (body) => ({
                url: `/getVideoUrl`, method: `GET`, params: {
                    licenseKey: body
                }
            }),
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while get video, try later."
            }
        })
    })
})

export const {
    useGetVideoUrlMutation
} = ExternalApi;

