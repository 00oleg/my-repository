import SearchTop from '../../components/Top';
import SearchResults from '../../components/Result';
import { useEffect, useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';

interface SearchResult {
  name: string;
  earthAnimal: string;
}
const SearchPage = () => {
  const [searchText, setSearchText] = useSearchQuery('searchText', '');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearchText = (param: string) => {
    setSearchText(param);
  };

  const handleLoading = (param: boolean) => {
    setLoading(param);
  };

  const handleResults = (param: []) => {
    setResults(param);
  };

  useEffect(() => {
    const handleSearch = (newSearchText: string) => {
      const clearSearchText = newSearchText.trim();

      handleLoading(true);

      fetch(
        `https://stapi.co/api/v1/rest/animal/search?name=${clearSearchText}`,
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
        .then(({ animals }) => {
          handleResults(animals);
          handleLoading(false);
        })
        .catch((error) => {
          handleLoading(false);
          throw new Error(error);
        });
    };

    handleSearch(searchText);
  }, [searchText]);

  return (
    <>
      <SearchTop searchText={searchText} onSearch={handleSearchText} />
      <SearchResults loading={loading} results={results} />
    </>
  );
};

export default SearchPage;
