import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RegistrationRequest} from "../../../features/auth/domain/models/RegistrationRequest";
import {RegistrationResponse} from "../../models/RegistrationResponse";

export const IROBApi = createApi({
    reducerPath: 'irob/api', baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/'
    }),
    tagTypes: ['Post'],
    refetchOnFocus: true,
    endpoints: build => ({
        registration: build.query<RegistrationResponse, RegistrationRequest>({
            query: ({email, password}) => ({
                url: `auth/registration`,
                method: `POST`
            })
        }), login: build.query({
            query: () => ({
                url: `auth/login`
            })
        })
    })
})

export const {useRegistrationQuery, useLoginQuery} = IROBApi