/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import { Provider } from 'react-redux';
import { createMockStore } from '../store/mockStore';
import Search from '../components/Search';
import { itemReducer, removeItems, toggleItem } from '../store/itemReducer';
import { SearchResultItem } from '../types/SearchTypes';
import { useItemDetailQuery } from '../services/api';
import { useRouter, usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock('../services/api', () => ({
  useItemDetailQuery: jest.fn(),
}));

describe('Card Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [],
      },
    });
  });

  test('Card component should render the card data', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Card
          {...{
            uid: '1',
            name: 'Animal 1',
            earthAnimal: 'true',
          }}
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
          }}
        />
      </Provider>,
    );

    const name = getByText('Animal 1');
    expect(name).toBeInTheDocument();
    const earth = getByText('Earth Animal: Yes');
    expect(earth).toBeInTheDocument();
  });
});

describe('CardOpenDetail', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [],
      },
    });
  });

  test('Clicking on a card opens a detailed card component', async () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: null,
      error: null,
      isLoading: true,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (usePathname as jest.Mock).mockReturnValue(() => '/search');

    const { container } = render(
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
            keywords: '',
            details: 'ANMA0000264633',
          }}
          handleSearchText={() => {}}
          loading={false}
          results={[]}
          totalPages={1}
        />
      </Provider>,
    );

    expect(container.querySelector('.detail-page')).toBeInTheDocument();
  });
});

describe('CardOpenDetailWithAPI', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [],
      },
    });
  });

  test('Clicking on a card opens a detailed card component and triggers an API call', async () => {
    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: {
        animal: {
          uid: '1',
          name: 'Animal 1',
          earthAnimal: true,
        },
      },
      error: null,
      isLoading: false,
    });

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    (usePathname as jest.Mock).mockReturnValue(() => '/search');

    const { container } = render(
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
            keywords: '',
            details: 'ASD5421234545',
          }}
          handleSearchText={() => {}}
          loading={false}
          results={[]}
          totalPages={1}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(container.querySelector('.detail-page')).toBeInTheDocument();
    });
  });
});

describe('itemSlice reducer', () => {
  const initialState = { values: {} };

  it('should return the initial state', () => {
    expect(itemReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle toggleItem - add item', () => {
    const mockItem: SearchResultItem = {
      uid: '1',
      name: 'Animal 1',
      earthAnimal: 'true',
      queryParams: {
        page: 1,
        perPage: 1,
        keywords: '',
      },
    };

    expect(itemReducer(initialState, toggleItem(mockItem))).toEqual({
      values: {
        '1': mockItem,
      },
    });
  });

  it('should handle toggleItem - remove item', () => {
    const mockItem: SearchResultItem = {
      uid: '1',
      name: 'Animal 1',
      earthAnimal: 'true',
      queryParams: {
        page: 1,
        perPage: 1,
        keywords: '',
      },
    };
    const stateWithItem = { values: { '1': mockItem } };

    expect(itemReducer(stateWithItem, toggleItem(mockItem))).toEqual(
      initialState,
    );
  });

  it('should handle removeItems', () => {
    const stateWithItems = {
      values: {
        '1': {
          uid: '1',
          name: 'Animal 1',
          earthAnimal: 'true',
          queryParams: {
            page: 1,
            perPage: 1,
            keywords: '',
          },
        },
        '2': {
          uid: '2',
          name: 'Animal 2',
          earthAnimal: 'false',
          queryParams: {
            page: 1,
            perPage: 1,
            keywords: '',
          },
        },
      },
    };

    expect(itemReducer(stateWithItems, removeItems())).toEqual(initialState);
  });
});
