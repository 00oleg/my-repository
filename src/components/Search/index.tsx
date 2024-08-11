import SearchTop from '../../components/Top';
import SearchResults from '../../components/Result';
import PaginationResults from '../../components/Pagination';
import { queryParams, SearchResultItem } from '../../types/SearchTypes';
import ResultActions from '../ResultActions';
import DetailPage from '../Details';

interface SearchProps {
  handleSearchText: (text: string, page: number) => void;
  loading: boolean;
  results: SearchResultItem[];
  totalPages: number;
  queryParams: queryParams;
}

const Search = ({
  handleSearchText,
  loading,
  results,
  totalPages,
  queryParams,
}: SearchProps) => {
  const { page, perPage, keywords, details } = queryParams;

  return (
    <div className="search-page">
      <div className="search-page__left">
        <SearchTop searchText={keywords} onSearch={handleSearchText} />
        <SearchResults
          loading={loading}
          results={results}
          queryParams={queryParams}
        />
        {loading || !results.length ? null : (
          <PaginationResults
            pageNumber={page}
            totalPages={totalPages}
            perPage={perPage}
            searchText={keywords}
          />
        )}

        <ResultActions />
      </div>

      <div className="search-page__right">
        {details ? <DetailPage queryParams={queryParams} /> : null}
      </div>
    </div>
  );
};

export default Search;
