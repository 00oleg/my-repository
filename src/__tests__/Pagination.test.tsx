/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import PaginationResults from '../components/Pagination';

test('Pagination component updates URL query parameter when page changes', () => {
  const { getByText } = render(
    <PaginationResults
      pageNumber={1}
      totalPages={10}
      perPage={10}
      searchText={''}
    />,
  );

  fireEvent.click(getByText('2'));
  expect(getByText('2').closest('a')).toHaveAttribute(
    'href',
    '?searchTerm=&page=2&per_page=10',
  );
});
