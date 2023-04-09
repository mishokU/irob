import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {SearchUsersResponse} from "../../models/common/SearchUsersResponse";
import {SearchUsersRequest} from "../../../features/rooms/domain/requests/SearchUsersRequest";
import {ServerUrl} from "../../../constants/Constants";

export const SearchApi = createApi({
    reducerPath: 'irob/api/search', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/search`,
        prepareHeaders: (headers, { getState }) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: build => ({
        searchUsersByCredentials: build.mutation<SearchUsersResponse, SearchUsersRequest>({
            query: (body) => ({
                url: `/users`, method: `POST`, body
            }),
            transformResponse: (response: SearchUsersResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while search room users";
            },
        }),
    })
})

export const {useSearchUsersByCredentialsMutation} = SearchApi