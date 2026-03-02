import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from "@/shared/api/rawBaseQuery.ts";
import type { IUser } from "@/entities/user";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({
    getAllUsers: build.query<IUser[], void>({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
    }),
    getUser: build.query<IUser, string>({
      query: (body) => ({
        url: `users/${body}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserQuery } = userApi;
