import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ServerUrl} from "../../../constants/Constants";
import {ConfigResponse} from "../../models/config/ConfigResponse";
import {UpdateNetworkRequest} from "../../../features/settings/domain/models/UpdateNetworkRequest";

export const ConfigApi = createApi({
    reducerPath: 'irob/api/config', baseQuery: fetchBaseQuery({
        baseUrl: `${ServerUrl}/config`
    }), endpoints: build => ({
        getConfig: build.mutation<ConfigResponse, void>({
            query: (body) => ({
                url: `/getConfig`, method: `GET`, body
            }),
        }),
        updateConfig: build.mutation<void, UpdateNetworkRequest>({
            query: (body) => ({
                url: `/updateConfig`, method: `POST`, body
            }),
        })
    })
})

export const {
    useGetConfigMutation,
    useUpdateConfigMutation
} = ConfigApi;