import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {LicenseResponse, LicensesResponse} from "../../models/common/LicensesResponse";
import {
    HandleFavouriteResponse
} from "../../models/licenses/HandleFavouriteResponse";
import {ServerUrl} from "../../../constants/Constants";
import {DeleteLicenseRequest} from "../../../features/profile/domain/DeleteLicenseRequest";
import {DeleteLicenseResult} from "../../models/licenses/DeleteLicenseResult";

export const LicensesApi = createApi({
    reducerPath: "irob/api/licenses", baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/licenses`,
        prepareHeaders: (headers) => {
            headers.set('token', localStorage.getItem("jwtToken") || "")
            return headers
        },
    }), endpoints: (builder) => ({
        getProfileLicenses: builder.mutation<LicensesResponse, void>({
            query: (body) => ({
                url: `/getAll`, method: `GET`
            }),
            transformResponse: (response: LicensesResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }), deleteLicense: builder.mutation<DeleteLicenseResult, DeleteLicenseRequest>({
            query: (license) => ({
                url: `/delete`, method: `DELETE`, params: {
                    licenseId: license.licenseId,
                    address: license.address
                }
            })
        }), handleFavourite: builder.mutation<HandleFavouriteResponse, number>({
            query: (licenseId) => ({
                url: `/handleFavourite`, method: `POST`, body: {
                    licenseId: licenseId
                }
            }),
            transformResponse: (response: HandleFavouriteResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }), getFavouriteLicenses: builder.mutation<LicensesResponse, void>({
            query: (body) => ({
                url: `/getFavourite`, method: `GET`
            }),
            transformResponse: (response: LicensesResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        }), getSoldLicenses: builder.mutation<LicensesResponse, void>({
            query: (body) => ({
                url: `/getSold`, method: `GET`
            }),
            transformResponse: (response: LicensesResponse) => response,
            transformErrorResponse(meta: unknown, arg: unknown): string {
                return "Error while getRoomRequirementsCost, try later."
            }
        })
    }),
});

export const {
    useGetProfileLicensesMutation,
    useDeleteLicenseMutation,
    useHandleFavouriteMutation,
    useGetSoldLicensesMutation,
    useGetFavouriteLicensesMutation,
} = LicensesApi;