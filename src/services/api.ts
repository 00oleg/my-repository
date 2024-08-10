import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ItemDetailFullResponse,
  ItemDetailParams,
  SearchFullResponse,
  SearchParams,
} from '../types/ApiTypes';
import { HYDRATE } from 'next-redux-wrapper';
import type { PayloadAction } from '@reduxjs/toolkit';

const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/animal' }),
  extractRehydrationInfo(action: PayloadAction, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    searchItems: builder.query<SearchFullResponse, SearchParams>({
      query: ({ searchText, pageNumber, perPage }) => {
        return `/search?name=${searchText}&pageNumber=${pageNumber}&pageSize=${perPage}`;
      },
    }),
    itemDetail: builder.query<ItemDetailFullResponse, ItemDetailParams>({
      query: ({ uid }) => {
        return `?uid=${uid}`;
      },
    }),
  }),
});

export const {
  useSearchItemsQuery,
  useItemDetailQuery,
  // util: { getRunningQueriesThunk },
} = itemApi;
export default itemApi;

export const { searchItems, itemDetail } = itemApi.endpoints;
