import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from "@/shared/api/rawBaseQuery.ts";
import type { IPost, PostsGetRequest } from "@/entities/post/model/types.ts";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({
    getAllPosts: build.query<IPost[], PostsGetRequest | void>({
      query: (params) => ({
        url: "/posts",
        method: "GET",
        params: params
          ? {
              ...(params.search ? { search: params.search } : {}),
              ...(params.categories?.length
                ? { category: params.categories }
                : {}),
            }
          : undefined,
      }),
    }),
  }),
});

export const { useGetAllPostsQuery } = postApi;
