import { DetailResult, SearchResultItem } from '../types/SearchTypes';

interface PageResponse {
  pageNumber: number;
  pageSize: number;
  numberOfElements: number;
  totalElements: number;
  totalPages: number;
  firstPage: boolean;
  lastPage: boolean;
}

export interface SearchParams {
  searchText: string;
  pageNumber: number;
  perPage: number;
}

export interface SearchFullResponse {
  page: PageResponse;
  animals: SearchResultItem[];
  sort: object;
}

export interface ItemDetailParams {
  uid: string;
}

export interface ItemDetailFullResponse {
  animal: DetailResult;
}
