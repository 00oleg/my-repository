import Link from 'next/link';

interface PaginationResultsProps {
  pageNumber: number;
  totalPages: number;
  perPage: number;
  searchText: string;
}

const getArray = (number: number) => {
  return [...Array(number).keys()];
};

const PaginationResults = ({
  pageNumber,
  totalPages,
  perPage,
  searchText,
}: PaginationResultsProps) => {
  return (
    <div className="pagination-result">
      <div className="pagination-result__list">
        <div className="pagination-result__title">Page:</div>
        {getArray(totalPages).map((el: number) => {
          return (
            <Link
              key={el}
              className={`pagination-result__item${pageNumber - 1 === el ? ' current' : ''}`}
              href={`?searchTerm=${searchText}&page=${el + 1}&per_page=${perPage}`}
            >
              {el + 1}
            </Link>
          );
        })}
      </div>

      <div className="pagination-result__list">
        <div className="pagination-result__title">Per Page:</div>
        {[1, 2, 3].map((el: number) => {
          const per_page = (el + 1) * 10;

          return (
            <Link
              key={el}
              className={`pagination-result__item${perPage === per_page ? ' current' : ''}`}
              href={`?searchTerm=${searchText}&page=${pageNumber}&per_page=${per_page}`}
            >
              {per_page}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default PaginationResults;
