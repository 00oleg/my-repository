export interface SearchResultItem {
  uid: string;
  name: string;
  earthAnimal: string;
  pageNumber?: number;
  queryParams: queryParams;
}

export interface DetailResult {
  uid: string;
  name: string;
  earthAnimal: boolean;
  earthInsect: boolean;
  avian: boolean;
  canine: boolean;
  feline: boolean;
}

export interface queryParams {
  page: number;
  perPage: number;
  keywords: string;
  details?: string;
}
