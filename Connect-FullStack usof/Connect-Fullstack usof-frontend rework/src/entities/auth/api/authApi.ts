import { createApi } from "@reduxjs/toolkit/query/react";
import { login } from "@/entities/auth/model/slice.ts";
import type {
  AuthResponse,
  LoginRequest,
} from "@/entities/auth/model/types.ts";
import { setUser } from "@/entities/user/model/slice.ts";
import { baseQueryWithAuth } from "@/entities/auth/api/baseQueryWithReauth.ts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
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
  }),
});

export const { useLoginMutation } = authApi;
