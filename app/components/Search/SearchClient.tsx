'use client';

import { useSearchItemsQuery } from '../../services/api';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import {
  ItemDetailFullResponse,
  SearchFullResponse,
} from '../../types/ApiTypes';
import { useNavigate } from '@remix-run/react';

interface SearchPageClientProps {
  initialData: SearchFullResponse | undefined;
  initialDetailData: ItemDetailFullResponse | undefined;
  details: string;
  keywords: string;
  page: number;
  perPage: number;
}

const SearchClientPage = ({
  initialData,
  initialDetailData,
  details,
  keywords,
  page,
  perPage,
}: SearchPageClientProps) => {
  const navigate = useNavigate();
  const currentSearchTerm = keywords ? String(keywords) : '';
  const [searchText, setSearchText] = useSearchQuery(
    'searchText',
    currentSearchTerm,
  );

  const handleSearchText = (param: string) => {
    setSearchText(param);
    navigate(`/search?searchTerm=${param}&page=1&per_page=${perPage}`);
  };

  const { data, error, isLoading } = useSearchItemsQuery(
    {
      searchText,
      pageNumber: page,
      perPage,
    },
    {
      skip: initialData !== undefined,
      selectFromResult: (result) => ({
        ...result,
        data: initialData || result.data,
      }),
    },
  );

  if (error) {
    return <div>Error loading item</div>;
  }

  return (
    <Search
      initialDetailData={initialDetailData}
      {...{
        searchText,
        handleSearchText,
        loading: isLoading,
        results: data?.animals || [],
        totalPages: data?.page?.totalPages || 0,
        perPage,
      }}
      queryParams={{
        page: page,
        perPage: perPage,
        keywords: keywords,
        details: details,
      }}
    />
  );
};

export default SearchClientPage;
