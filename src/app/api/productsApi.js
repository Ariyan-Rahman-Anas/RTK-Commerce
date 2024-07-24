import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "products",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://localhost:5000",
    baseUrl: "https://rtk-commerce-back-end.vercel.app",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProductsInHome: builder.query({
      query: () => "/products",
    }),
    getProducts: builder.query({
      query: ({ page = 1, limit = 8 }) =>
        `/products?page=${page}&limit=${limit}`,
    }),

    getProductById: builder.query({
      query: (_id) => `/products/${_id}`,
    }),
  }),
});

export const {useGetProductsInHomeQuery , useGetProductsQuery, useGetProductByIdQuery } = productsApi;