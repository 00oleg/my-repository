import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';
// import { SearchResultItem } from '../../types/SearchTypes';
import { useSearchItemsQuery } from '../../services/api';

const SearchPage = () => {
  const [firstLoader, setFirstLoader] = useState<boolean>(true);
  const [searchText, setSearchText] = useSearchQuery('searchText', '');
  // const [results, setResults] = useState<SearchResultItem[]>([]);
  // const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get('page') || 1),
  );
  // const [totalPages, setTotalPages] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const handleSearchParams = (param: URLSearchParams) => {
    setSearchParams(param);
  };

  const handleSearchText = (param: string) => {
    setSearchText(param);
  };

  // const handleLoading = (param: boolean) => {
  //   setLoading(param);
  // };

  // const handleResults = (param: []) => {
  //   setResults(param);
  // };

  const handlePageNumber = (param: number) => {
    setPageNumber(param);
  };

  // const handleTotalPages = (param: number) => {
  //   setTotalPages(param);
  // };

  const handlePerPage = (param: number) => {
    setPerPage(param);
  };

  const { data, error, isLoading } = useSearchItemsQuery({
    searchText,
    pageNumber,
    perPage,
  });

  const handleSearch = (newSearchText: string) => {
    const clearSearchText = newSearchText.trim();
    setSearchText(clearSearchText);
    setSearchParams({
      searchTerm: clearSearchText,
      page: pageNumber.toString(),
      perPage: perPage.toString(),
    });
  };

  // const handleSearch = (newSearchText: string) => {
  //   const clearSearchText = newSearchText.trim();

  //   handleLoading(true);

  //   fetch(
  //     `https://stapi.co/api/v1/rest/animal/search?name=${clearSearchText}&pageNumber=${pageNumber - 1}&pageSize=${perPage}`,
  //     {
  //       method: 'POST',
  //     },
  //   )
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Response was not ok');
  //       }

  //       return response.json();
  //     })
  //     .then(({ animals, page }) => {
  //       handleTotalPages(page.totalPages);
  //       handleResults(animals);
  //       handleLoading(false);
  //     })
  //     .catch((error) => {
  //       handleLoading(false);
  //       throw new Error(error);
  //     });
  // };

  useEffect(() => {
    if (pageNumber !== 1) {
      const updatedSearchParams = new URLSearchParams();
      updatedSearchParams.set('page', '1');
      handleSearchParams(updatedSearchParams);
      handlePageNumber(1);

      if (firstLoader) {
        setFirstLoader(false);
        handleSearch(searchText);
      }
    } else {
      if (firstLoader) {
        setFirstLoader(false);
      }

      handleSearch(searchText);
    }
  }, [searchText, perPage]);

  useEffect(() => {
    if (!firstLoader) {
      handleSearch(searchText);
    }
  }, [pageNumber]);

  useEffect(() => {
    if (!firstLoader) {
      handlePageNumber(Number(searchParams.get('page') || 1));
    }
  }, [searchParams]);

  if (error) {
    return <div>Error loading item</div>;
  }

  return (
    <>
      <Search
        {...{
          searchText,
          handleSearchText,
          loading: isLoading,
          results: data?.animals || [],
          pageNumber: data?.page.pageNumber || 0,
          totalPages: data?.page.totalPages || 0,
          perPage,
          handlePerPage,
        }}
      />
    </>
  );
};

export default SearchPage;
