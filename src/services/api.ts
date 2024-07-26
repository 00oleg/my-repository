import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  ItemDetailFullResponse,
  ItemDetailParams,
  SearchFullResponse,
  SearchParams,
} from '../types/ApiTypes';

const itemApi = createApi({
  reducerPath: 'itemApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://stapi.co/api/v1/rest/animal' }),
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

export const { useSearchItemsQuery, useItemDetailQuery } = itemApi;
export default itemApi;
