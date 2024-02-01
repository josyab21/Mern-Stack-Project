import { apiSlice } from "../../../../API/appApi";
import { AuthResponse } from "../../../../types/authresponse";
import { Credentials } from "../../../../types/credentials";
import { User } from "../../../../types/user";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, Credentials>({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: credentials,
      }),
    }),
    register: builder.mutation<AuthResponse, User>({
      query: (user) => ({
        url: "/register",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApiSlice;
