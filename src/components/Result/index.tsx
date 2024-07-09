import { useState } from 'react';

interface SearchResultItem {
  name: string;
  earthAnimal: string;
}

interface SearchResultsProps {
  results: SearchResultItem[];
  loading: boolean;
}

const SearchResults = ({ loading, results }: SearchResultsProps) => {
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
        <ul>
          {results.map((result, index) => (
            <li key={index}>
              <strong>{result.name}</strong> -
              <span>Earth Animal: {result.earthAnimal ? 'Yes' : 'No'}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">No results</div>
      )}
    </div>
  );
};

export default SearchResults;
