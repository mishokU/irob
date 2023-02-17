import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RegistrationRequest} from "../../../features/auth/domain/models/RegistrationRequest";
import {LoginRequest} from "../../../features/auth/domain/models/LoginRequest";
import {AuthResponse} from "../../models/AuthResponse";
import {LicensesResponse} from "../../models/LicensesResponse";

export const AuthApi = createApi({
    reducerPath: 'irob/api', baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }), endpoints: build => ({
        registration: build.mutation<string, RegistrationRequest>({
            query: (body) => ({
                url: `auth/registration`, method: `POST`, body
            }),
            transformResponse: (response: AuthResponse) => response.token,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                console.log(`response: ${baseQueryReturnValue}`)
                return baseQueryReturnValue as string
            }
        }),
        login: build.mutation<AuthResponse, LoginRequest>({
            query: (body) => ({
                url: `auth/login`, method: `POST`, body
            }),
            transformResponse: (response: AuthResponse) => response,
            transformErrorResponse(baseQueryReturnValue: unknown, meta: unknown, arg: unknown): string {
                console.log(`response: ${baseQueryReturnValue}`)
                return baseQueryReturnValue as string
            }
        }),
        getUser: build.mutation<string, void>({
            query: (body) => ({
                url: `profile`, method: `POST`, body
            })
        }),
        getUserLicenses: build.mutation<any, LicensesResponse>({
            query: (type: string) => ({
                url: `profile/licenses/${type}`, method: `GET`
            })
        })
    })
})

export const {useRegistrationMutation, useLoginMutation} = AuthApi