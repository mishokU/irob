import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ProfileResponse} from "../../models/profile/ProfileResponse";
import {UpdateProfile} from "../../../features/settings/domain/models/UpdateProfile";
import {UpdateAccountLedgerResponse} from "../../models/profile/UpdateAccountLedgerResponse";
import {
    UpdateProfileLedger
} from "../../../features/profile/domain/UpdateProfileLedger";
import {ServerUrl} from "../../../constants/Constants";
import {
    UpdateProfileLocationAndLanguage
} from "../../../features/settings/domain/models/UpdateProfileLocationAndLanguage";
import {LocationAndLanguageProfileResponse} from "../../models/profile/LocationAndLanguageProfileResponse";
import {DeleteAccountResponse} from "../../models/profile/DeleteAccountResponse";
import {DisableAccountResponse} from "../../models/profile/DisableAccountResponse";
import {UpdatePasswordResponse} from "../../models/profile/UpdatePasswordResponse";
import {UpdatePasswordRequest} from "../../../features/settings/domain/models/UpdatePasswordRequest";

export const ProfileApi = createApi({
    reducerPath: "irob/api/profile", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/profile`,
        prepareHeaders: (headers, {getState}) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (build) => ({
        getProfile: build.mutation<ProfileResponse, void>({
            query: () => ({
                url: `/get`, method: `GET`,
            }),
        }),
        updateProfile: build.mutation<ProfileResponse, UpdateProfile>({
            query: (body) => ({
                url: `/update`, method: `POST`, body,
            }),
        }),
        updateLocationAndLanguage: build.mutation<LocationAndLanguageProfileResponse, UpdateProfileLocationAndLanguage>({
            query: (body) => ({
                url: `/updateLanguageAndLocation`, method: `POST`, body,
            }),
        }),
        deleteProfile: build.mutation<boolean, void>({
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
        }),
        deleteAccount: build.mutation<DeleteAccountResponse, void>({
            query: (body) => ({
                url: `/delete`, method: `DELETE`, body
            }),
            transformResponse: (response: DeleteAccountResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while account deleting, try later."
            }
        }),
        disableAccount: build.mutation<DisableAccountResponse, void>({
            query: (body) => ({
                url: `/handleDisable`, method: `POST`, body
            }),
            transformResponse: (response: DisableAccountResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while account deleting, try later."
            }
        }),
        updatePassword: build.mutation<UpdatePasswordResponse, UpdatePasswordRequest>({
            query: (body) => ({
                url: `/updatePassword`, method: `POST`, body
            }),
            transformResponse: (response: DisableAccountResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while account deleting, try later."
            }
        }),
    }),
});

export const {
    useUpdateProfileMutation,
    useGetProfileMutation,
    useUpdateLocationAndLanguageMutation,
    useUpdatePasswordMutation,
    useDeleteAccountMutation,
    useDisableAccountMutation,
    useUpdateLedgerAccountMutation
} = ProfileApi;