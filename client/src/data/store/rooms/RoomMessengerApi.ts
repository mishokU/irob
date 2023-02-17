import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { ProfileResponse } from "../../models/ProfileResponse";

export const RoomMessengerApi = createApi({
  reducerPath: "irob/api/rooms/messages/",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/rooms/messages",
    headers: {
      token: localStorage.getItem("jwtToken") || "",
    },
  }),
  endpoints: (build) => ({
    getMessages: build.mutation<ProfileResponse, string>({
      query: (roomId) => ({
        url: `/getMessages/${roomId}`,
        method: `GET`,
      }),
    }),
  }),
});

export const { useGetMessagesMutation } = RoomMessengerApi;
