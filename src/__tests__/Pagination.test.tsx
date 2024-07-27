/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import PaginationResults from '../components/Pagination';

const LocationDisplay = () => {
  const location = useLocation();
  return <div data-testid="location-display">{location.search}</div>;
};

test('Pagination component updates URL query parameter when page changes', () => {
  const { getByTestId, getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PaginationResults
                pageNumber={1}
                totalPages={10}
                perPage={10}
                handlePerPage={() => {}}
              />
              <LocationDisplay />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

  expect(getByTestId('location-display')).toHaveTextContent('');
  fireEvent.click(getByText('2'));
  expect(getByTestId('location-display')).toHaveTextContent('?page=2');
  fireEvent.click(getByText('3'));
  expect(getByTestId('location-display')).toHaveTextContent('?page=3');
});
