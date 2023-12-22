import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_PATH + "/auth",
  }),
  endpoints: (builder) => ({
    authenticateUser: builder.mutation({
      query: (body: { name: string; password: string }) => {
        return {
          url: "/authorize",
          method: "post",
          body,
        };
      },
    }),
    googleAuthenticateUser: builder.mutation({
      query: (body: { token: string | undefined }) => {
        return {
          url: "/google",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useAuthenticateUserMutation, useGoogleAuthenticateUserMutation } = authApi;
