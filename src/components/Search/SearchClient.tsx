'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useSearchItemsQuery } from '../../services/api';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
import { ItemDetailFullResponse, SearchFullResponse } from 'src/types/ApiTypes';

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
  const currentSearchTerm = keywords ? String(keywords) : '';
  const { replace } = useRouter();
  const pathname = usePathname();
  const [searchText, setSearchText] = useSearchQuery(
    'searchText',
    currentSearchTerm,
  );

  const handleSearchText = (param: string) => {
    setSearchText(param);
    replace(`${pathname}/?searchTerm=${param}&page=1&per_page=${perPage}`);
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
