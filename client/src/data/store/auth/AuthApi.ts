import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RegistrationRequest} from "../../../features/auth/domain/models/RegistrationRequest";
import {LoginRequest} from "../../../features/auth/domain/models/LoginRequest";
import {AuthResponse} from "../../models/common/AuthResponse";
import {ProfileResponse} from "../../models/profile/ProfileResponse";
import {ServerUrl} from "../../../constants/Constants";

export const AuthApi = createApi({
    reducerPath: 'irob/api/auth', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/auth`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: build => ({
        registration: build.mutation<AuthResponse, RegistrationRequest>({
            query: (body) => ({
                url: `/registration`, method: `POST`, body
            }),
            transformResponse: (response: AuthResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                console.log(`response: ${baseQueryReturnValue}`)
                return baseQueryReturnValue as string
            }
        }),
        login: build.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: `/login`, method: `POST`, body
            }),
            transformResponse: (response: AuthResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                console.log(`response: ${baseQueryReturnValue}`)
                return baseQueryReturnValue as string
            }
        }),
        getUserByCredentials: build.mutation<ProfileResponse, void>({
            query: (body) => ({
                url: `/search`, method: `POST`, body
            })
        }),
    })
})

export const {useRegistrationMutation, useLoginMutation} = AuthApi