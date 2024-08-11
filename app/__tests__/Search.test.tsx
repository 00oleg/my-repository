/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import SearchTop from '../components/Top';
import Search from '../components/Search';
import { Provider } from 'react-redux';
import { createMockStore } from '../store/mockStore';
import { useItemDetailQuery, useSearchItemsQuery } from '../services/api';
import SearchClientPage from '../components/Search/SearchClient';
import { useNavigate } from '@remix-run/react';

beforeEach(() => {
  localStorage.clear();
});

global.URL.createObjectURL = jest.fn(() => 'mocked-url');

jest.mock('@remix-run/react', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));

jest.mock('../services/api', () => ({
  useItemDetailQuery: jest.fn(),
  useSearchItemsQuery: jest.fn(),
  itemApi: jest.fn(),
}));

test('Search component clicking the Search button saves the entered value to the local storage', () => {
  const { getByTestId } = render(
    <SearchTop searchText="" onSearch={() => {}} />,
  );

  const input = getByTestId('search-input');
  const button = getByTestId('search-button');
  fireEvent.change(input, { target: { value: 'text query' } });
  expect(input).toHaveValue('text query');
  fireEvent.click(button);
  expect(localStorage.getItem('searchText')).toBe('text query');
});

describe('Search Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [
          { uid: '1', name: 'Lion', earthAnimal: true },
          { uid: '2', name: 'Penguin', earthAnimal: false },
        ],
      },
    });
  });

  test('Component search have keywords text', () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    const { getByTestId } = render(
      <Provider store={store}>
        <Search
          initialDetailData={{
            animal: {
              uid: 'ANMA0000264633',
              name: 'Abalone',
              earthAnimal: true,
              earthInsect: false,
              avian: false,
              canine: false,
              feline: false,
            },
          }}
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: 'text query',
          }}
          handleSearchText={() => {}}
          loading={false}
          results={[]}
          totalPages={1}
        />
      </Provider>,
    );

    const input = getByTestId('search-input');
    expect(input).toHaveValue('text query');
  });
});

describe('Search Page Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [
          { uid: '1', name: 'Lion', earthAnimal: true },
          { uid: '2', name: 'Penguin', earthAnimal: false },
        ],
      },
    });
  });

  test('Component search page have keywords text', () => {
    const mockNavigate = jest.fn();
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    (useSearchItemsQuery as jest.Mock).mockReturnValue({
      data: {},
      error: null,
      isLoading: true,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { getByTestId } = render(
      <Provider store={store}>
        <SearchClientPage
          initialData={{
            page: {
              pageNumber: 0,
              pageSize: 50,
              numberOfElements: 50,
              totalElements: 563,
              totalPages: 12,
              firstPage: true,
              lastPage: false,
            },
            animals: [
              {
                uid: 'ANMA0000032315',
                name: "'Owon",
                earthAnimal: 'false',
                queryParams: {
                  page: 1,
                  perPage: 1,
                  keywords: '',
                },
              },
            ],
            sort: {},
          }}
          initialDetailData={{
            animal: {
              uid: 'ANMA0000264633',
              name: 'Abalone',
              earthAnimal: true,
              earthInsect: false,
              avian: false,
              canine: false,
              feline: false,
            },
          }}
          details={'ANMA0000264633'}
          keywords={'text query'}
          page={1}
          perPage={10}
        />
      </Provider>,
    );

    const input = getByTestId('search-input');
    expect(input).toHaveValue('text query');
  });
});
