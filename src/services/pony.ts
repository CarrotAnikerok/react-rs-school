import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PonyData, PonyListing } from '../lib/features/home/homeSlice';

interface ListParams {
  query: string;
  limit: number;
  offset: number;
}

const CACHE_TTL = Number(process.env.NEXT_PUBLIC_CACHE_TTL) || 60;

export const ponyApi = createApi({
  reducerPath: 'ponyApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://ponyapi.net/v1/' }),
  tagTypes: ['Pony'],
  keepUnusedDataFor: CACHE_TTL,
  endpoints: (build) => ({
    getItemList: build.query<PonyListing, ListParams>({
      query: ({ query, limit, offset }) =>
        `character/${query}?limit=${limit}&offset=${offset}`,
      providesTags: () => [{ type: 'Pony', id: 'LIST' }],
    }),
    getItemDetails: build.query<
      { status: number; data: PonyData[] },
      { id: string }
    >({
      query: ({ id }) => `character/${id}`,
      providesTags: (_result, _error, { id }) => [{ type: 'Pony', id }],
    }),
  }),
});

export const { useGetItemListQuery, useGetItemDetailsQuery } = ponyApi;
