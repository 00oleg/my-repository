import SearchTop from '../../components/Top';
import SearchResults from '../../components/Result';
import PaginationResults from '../../components/Pagination';
import { Outlet } from 'react-router-dom';
import { SearchResultItem } from '../../types/SearchTypes';
import ResultActions from '../ResultActions';

interface SearchProps {
  searchText: string;
  handleSearchText: (text: string, page: number) => void;
  loading: boolean;
  results: SearchResultItem[];
  pageNumber: number;
  totalPages: number;
  perPage: number;
  handlePerPage: (page: number) => void;
}

const Search = ({
  searchText,
  handleSearchText,
  loading,
  results,
  pageNumber,
  totalPages,
  perPage,
  handlePerPage,
}: SearchProps) => {
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
            handlePerPage={handlePerPage}
          />
        )}

        <ResultActions />
      </div>

      <div className="search-page__right">
        <Outlet />
      </div>
    </div>
  );
};

export default Search;
