import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/api";
import { authApi } from "@/entities/auth";

export const baseQueryWithAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extra) => {
  const result = await baseQuery(args, api, extra);
  const url = typeof args === "string" ? args : args.url;
  if (url.includes("/auth/refresh")) {
    return result;
  }
  if (result.error?.status === 401) {
    const refreshData = await api
      .dispatch(authApi.endpoints.refresh.initiate())
      .unwrap();
    if (refreshData) {
      return baseQuery(args, api, extra);
    }
  }
  return result;
};
