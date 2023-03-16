import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ProfileResponse} from "../../models/profile/ProfileResponse";
import {UpdateProfile} from "../../../features/settings/domain/models/UpdateProfile";
import {UpdateAccountLedgerResponse} from "../../models/profile/UpdateAccountLedgerResponse";
import {
    UpdateProfileLedger
} from "../../../features/profile/domain/UpdateProfileLedger";

export const ProfileApi = createApi({
    reducerPath: "irob/api/profile", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/profile",
        prepareHeaders: (headers, { getState }) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (build) => ({
        getProfile: build.mutation<ProfileResponse, void>({
            query: () => ({
                url: `/get`, method: `GET`,
            }),
        }), updateProfile: build.mutation<ProfileResponse, UpdateProfile>({
            query: (body) => ({
                url: `/update`, method: `POST`, body,
            }),
        }), deleteProfile: build.mutation<boolean, void>({
            query: () => ({
                url: `/update`, method: `POST`,
            }),
        }),
        updateLedgerAccount: build.mutation<UpdateAccountLedgerResponse, UpdateProfileLedger>({
            query: (body) => ({
                url: `/updateAccountLedger`, method: `POST`, body
            }),
            transformResponse: (response: UpdateAccountLedgerResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while updateLedgerAccount, try later."
            }
        })
    }),
});

export const {useUpdateProfileMutation, useGetProfileMutation, useUpdateLedgerAccountMutation} = ProfileApi;