import SearchTop from '../../components/Top';
import SearchResults from '../../components/Result';
import PaginationResults from '../../components/Pagination';
import { SearchResultItem } from '../../types/SearchTypes';
import ResultActions from '../ResultActions';
import { useSearchParams } from 'next/navigation';
import DetailPage from '../Details';

interface SearchProps {
  searchText: string;
  handleSearchText: (text: string, page: number) => void;
  loading: boolean;
  results: SearchResultItem[];
  pageNumber: number;
  totalPages: number;
  perPage: number;
}

const Search = ({
  searchText = '',
  handleSearchText,
  loading,
  results,
  pageNumber,
  totalPages,
  perPage,
}: SearchProps) => {
  const searchParams = useSearchParams();
  const currentDetails = searchParams.get('details');

  return (
    <div className="search-page">
      <div className="search-page__left">
        <SearchTop searchText={searchText} onSearch={handleSearchText} />
        <SearchResults
          loading={loading}
          results={results}
          pageNumber={pageNumber}
        />
        {loading || !results.length ? null : (
          <PaginationResults
            pageNumber={pageNumber}
            totalPages={totalPages}
            perPage={perPage}
            searchText={searchText}
          />
        )}

        <ResultActions />
      </div>

      <div className="search-page__right">
        {currentDetails ? <DetailPage /> : null}
      </div>
    </div>
  );
};

export default Search;
