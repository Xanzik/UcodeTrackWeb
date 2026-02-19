import type { BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/api";
import { logout, setAccessToken } from "@/entities/auth/model/slice.ts";
import type { AuthResponse } from "@/entities/auth/model/types.ts";

export const baseQueryWithAuth: BaseQueryFn = async (args, api, extra) => {
  let result = await baseQuery(args, api, extra);
  if (result.error?.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
      },
      api,
      extra,
    );
    if (refreshResult.data) {
      const data = refreshResult.data as AuthResponse;
      api.dispatch(setAccessToken(data.accessToken));
      result = await baseQuery(args, api, extra);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
