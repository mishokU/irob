import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ServerUrl} from "../../../constants/Constants";
import {NotificationsResult} from "../../models/notifications/NotificationsResult";

export const NotificationsApi = createApi({
    reducerPath: "irob/api/notifications", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/notifications`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        }
    }),
    endpoints: (builder) => ({
        getNotifications: builder.mutation<NotificationsResult, void>({
            query: (body) => ({
                url: `/all`, method: `GET`,
            }),
            transformResponse: (response: NotificationsResult) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        })
    })
})

export const {
    useGetNotificationsMutation
} = NotificationsApi;