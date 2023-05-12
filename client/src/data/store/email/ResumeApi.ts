import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ServerUrl} from "../../../constants/Constants";
import {CommonResponse} from "../../models/common/CommonResponse";
import {SendResumeRequest} from "../../../features/abousUs/domain/SendResumeRequest";


export const ResumeApi = createApi({
    reducerPath: 'irob/api/email/resume', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/emails`,
        prepareHeaders: (headers) => {
            headers.set("Content-Type", "multipart/form-data boundary=------WebKitFormBoundaryg7okV37G7Gfll2hf--")
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: build => ({
        sendResume: build.mutation<CommonResponse, SendResumeRequest>({
            query: (body) => ({
                url: `/resume`, method: `POST`, body
            }),
            transformResponse: (response: CommonResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while send resume!"
            }
        })
    })
})

export const {
    useSendResumeMutation
} = ResumeApi