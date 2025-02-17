import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User, Transaction, LoginRequest, LoginResponse } from '../types';
import { RootState } from './store';

export const api = createApi({
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://0.0.0.0:3001',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    register: builder.mutation<{ id_token: string }, { email: string; username: string; password: string }>({
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
			query: (credentials) => ({
				url: '/sessions/create',
				method: 'POST',
				body: credentials,
			}),
    }),
    getUserInfo: builder.query<{ user_info_token: User }, void>({
      query: () => '/api/protected/user-info',
    }),
    getUsers: builder.mutation<User[], { filter: string }>({
      query: (body) => ({
        url: '/api/protected/users/list',
        method: 'POST',
        body,
      }),
    }),
    createTransaction: builder.mutation<{ trans_token: Transaction }, { name: string; amount: number }>({
      query: (body) => ({
        url: '/api/protected/transactions',
        method: 'POST',
        body,
      }),
    }),
    getTransactions: builder.query<{ trans_token: Transaction[] }, void>({
      query: () => '/api/protected/transactions',
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserInfoQuery,
  useGetUsersMutation,
  useCreateTransactionMutation,
  useGetTransactionsQuery,
} = api;