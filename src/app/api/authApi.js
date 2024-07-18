import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    credentials: "include", 
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (newUser) => ({
        url: "/sign-up",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: "/log-in",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      }),
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/log-out",
        method:"GET"
      })
    })
  }),
});

export const { useSignUpMutation, useSignInMutation, useSignOutMutation } =
  authApi;