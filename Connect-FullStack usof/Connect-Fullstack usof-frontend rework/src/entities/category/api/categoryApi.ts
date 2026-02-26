import { createApi } from "@reduxjs/toolkit/query/react";
import { rawBaseQuery } from "@/shared/api/rawBaseQuery.ts";
import type { ICategory } from "@/entities/category/model/types.ts";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: rawBaseQuery,
  endpoints: (build) => ({
    getAllCategories: build.query<ICategory[], string, void>({
      query: (search) => ({
        url: "/categories",
        method: "GET",
        params: search ? { search } : undefined,
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery } = categoryApi;
