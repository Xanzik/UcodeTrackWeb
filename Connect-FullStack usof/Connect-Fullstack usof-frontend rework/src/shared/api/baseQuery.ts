import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type StateWithAuth = {
  auth?: {
    accessToken?: string | null;
  };
};

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as StateWithAuth).auth?.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
