import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SigninDto } from "./openapi";

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_BASE_URL}/auth`
  }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: SigninDto) => {
        return {
          url: '/signin',
          method: 'post',
          body
        };
      }
    })
  })
})

export const { useLoginUserMutation } = authApi;