import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { UserType, RegisterResponse, LoginResponse } from "@/types/user";

const USER_API = "http://localhost:8080/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_API,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    // Register
    registerUser: builder.mutation<RegisterResponse, Partial<UserType>>({
      query: (formData) => ({
        url: "register",
        method: "POST",
        body: formData,
      }),
    }),

    // Login
    loginUser: builder.mutation<LoginResponse, { email: string; password: string }>({
      query: (formData) => ({
        url: "login",
        method: "POST",
        body: formData,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn({ user: result.data.user }));
        } catch (error) {
          console.error("Login failed", error);
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
} = authApi;
