import { createApi } from "@reduxjs/toolkit/query/react";
import { login, logout } from "@/entities/auth/model/slice.ts";
import type {
  ActivateRequest,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/entities/auth/model/types.ts";
import { setUser } from "@/entities/user/model/slice.ts";
import { rawBaseQuery } from "@/shared/api/rawBaseQuery.ts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({
    login: build.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({
        url: `/auth/login`,
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.accessToken));
          dispatch(setUser(data.user));
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
          }
        }
      },
    }),
    register: build.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
          }
        }
      },
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(_, { dispatch }) {
        try {
          dispatch(logout());
        } catch (e) {
          if (e instanceof Error) {
            console.error(e.message);
          }
        }
      },
    }),
    refresh: build.mutation<AuthResponse, void>({
      query: () => ({
        url: `/auth/refresh`,
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(login(data.accessToken));
          dispatch(setUser(data.user));
        } catch (e) {
          dispatch(logout());
          if (e instanceof Error) {
            console.error(e.message);
          }
        }
      },
    }),
    activateAccount: build.mutation<void, ActivateRequest>({
      query: ({ token }) => ({
        url: `/auth/activate/${token}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshMutation,
  useRegisterMutation,
  useActivateAccountMutation,
  useLogoutMutation,
} = authApi;
