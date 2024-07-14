import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import useSearchQuery from '../../hooks/useSearchQuery';
import Search from '../../components/Search';

interface SearchResult {
  uid: string;
  name: string;
  earthAnimal: string;
}

const SearchPage = () => {
  const [firstLoader, setFirstLoader] = useState<boolean>(true);
  const [searchText, setSearchText] = useSearchQuery('searchText', '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageNumber, setPageNumber] = useState<number>(
    Number(searchParams.get('page') || 1),
  );
  const [totalPages, setTotalPages] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(10);

  const handleSearchParams = (param: URLSearchParams) => {
    setSearchParams(param);
  };

  const handleSearchText = (param: string) => {
    setSearchText(param);
  };

  const handleLoading = (param: boolean) => {
    setLoading(param);
  };

  const handleResults = (param: []) => {
    setResults(param);
  };

  const handlePageNumber = (param: number) => {
    setPageNumber(param);
  };

  const handleTotalPages = (param: number) => {
    setTotalPages(param);
  };

  const handlePerPage = (param: number) => {
    setPerPage(param);
  };

  const handleSearch = (newSearchText: string) => {
    const clearSearchText = newSearchText.trim();

    handleLoading(true);

    fetch(
      `https://stapi.co/api/v1/rest/animal/search?name=${clearSearchText}&pageNumber=${pageNumber - 1}&pageSize=${perPage}`,
      {
        method: 'POST',
      },
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response was not ok');
        }

        return response.json();
      })
      .then(({ animals, page }) => {
        handleTotalPages(page.totalPages);
        handleResults(animals);
        handleLoading(false);
      })
      .catch((error) => {
        handleLoading(false);
        throw new Error(error);
      });
  };

  useEffect(() => {
    console.log(1, firstLoader);

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
    console.log(2, firstLoader);

    if (!firstLoader) {
      handleSearch(searchText);
    }
  }, [pageNumber]);

  useEffect(() => {
    console.log(3, firstLoader);

    if (!firstLoader) {
      handlePageNumber(Number(searchParams.get('page') || 1));
    }
  }, [searchParams]);

  return (
    <Search
      {...{
        searchText,
        handleSearchText,
        loading,
        results,
        pageNumber,
        totalPages,
        perPage,
        handlePerPage,
      }}
    />
  );
};

export default SearchPage;
