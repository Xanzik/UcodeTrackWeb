import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from "@/shared/api/rawBaseQuery.ts";
import type { IPost } from "@/entities/post/model/types.ts";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], void>({
      query: () => ({
        url: "/posts",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
