import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {LicensesResponse} from "../../models/common/LicensesResponse";
import {ProfileResponse} from "../../models/common/ProfileResponse";
import {UpdateProfile} from "../../../features/settings/domain/models/UpdateProfile";

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
        }), getUserLicenses: build.mutation<any, LicensesResponse>({
            query: (type: string) => ({
                url: `/licenses/${type}`, method: `GET`,
            }),
        }),
    }),
});

export const {useUpdateProfileMutation, useGetProfileMutation} = ProfileApi;