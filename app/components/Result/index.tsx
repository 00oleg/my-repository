import { useState } from 'react';
import Card from '../Card';
import { queryParams, SearchResultItem } from '../../types/SearchTypes';

interface SearchResultsProps {
  results: SearchResultItem[];
  loading: boolean;
  queryParams: queryParams;
}

const SearchResults = ({
  loading,
  results,
  queryParams,
}: SearchResultsProps) => {
  const [hasError, setHasError] = useState(false);

  const handleHasError = () => {
    setHasError(true);
  };

  if (hasError) {
    throw new Error('Error in event handler');
  }

  if (loading) {
    return (
      <div className="search-result">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="search-result">
      <h2>
        Search Star Trek Animals
        <button className="btn-error" onClick={handleHasError}>
          Get Error
        </button>
      </h2>
      {results.length ? (
        <div className="card-list">
          {results.map((result, index) => (
            <Card key={index} {...result} queryParams={queryParams} />
          ))}
        </div>
      ) : (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};

export default SearchResults;
