import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {LicensesResponse} from "../../models/common/LicensesResponse";

export const LicensesApi = createApi({
    reducerPath: "irob/api/licenses", baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:5000/licenses",
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
        }),
        deleteLicense: builder.mutation<string, number>({
            query: (licenseId) => ({
                url: `/delete`, method: `DELETE`, params: {
                    licenseId: licenseId
                }
            })
        }),
        handleFavourite: builder.mutation<boolean, number>({
            query: (licenseId) => ({
                url: `/handleFavourite`, method: `POST`, params: {
                    licenseId: licenseId
                }
            })
        })
    }),
});

export const {
    useGetProfileLicensesMutation,
    useDeleteLicenseMutation,
    useHandleFavouriteMutation
} = LicensesApi;