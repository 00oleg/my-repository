/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import {
  BrowserRouter,
  MemoryRouter,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Card from '../components/Card';
import DetailPage from '../pages/Detail';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import { itemReducer, removeItems, toggleItem } from '../store/itemReducer';
import { SearchResultItem } from '../types/SearchTypes';

test('Card component should render the card data', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <Card
          {...{
            uid: '1',
            name: 'Animal 1',
            earthAnimal: 'true',
            pageNumber: 1,
          }}
        />
      </Provider>
    </MemoryRouter>,
  );

  const name = getByText('Animal 1');
  expect(name).toBeInTheDocument();
  const earth = getByText('Earth Animal: Yes');
  expect(earth).toBeInTheDocument();
});

jest.mock('@reduxjs/toolkit/query/react', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit/query/react');
  return {
    ...originalModule,
    fetchBaseQuery: jest.fn(() => async () => ({
      data: {
        animal: {
          uid: '1',
          name: 'Animal 1',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
    })),
  };
});

describe('CardOpenDetail', () => {
  test('Clicking on a card opens a detailed card component', async () => {
    const { container } = render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Card
                    {...{
                      uid: '1',
                      name: 'Animal 1',
                      earthAnimal: 'true',
                      pageNumber: 1,
                    }}
                  />
                  <Outlet />
                </>
              }
            >
              <Route path="details" element={<DetailPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('card-list__item-link'));

    await waitFor(() => {
      expect(container.querySelector('.detail-page')).toBeInTheDocument();
    });
  });
});

jest.mock('@reduxjs/toolkit/query/react', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit/query/react');
  return {
    ...originalModule,
    fetchBaseQuery: jest.fn(() => async () => ({
      data: {
        animal: {
          uid: '1',
          name: 'Animal 1',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
    })),
  };
});

describe('CardOpenDetailWithAPI', () => {
  test('Clicking on a card opens a detailed card component and triggers an API call', async () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Card
                    {...{
                      uid: '1',
                      name: 'Animal 1',
                      earthAnimal: 'true',
                      pageNumber: 1,
                    }}
                  />
                  <Outlet />
                </>
              }
            >
              <Route path="details" element={<DetailPage />} />
            </Route>
          </Routes>
        </Provider>
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('card-list__item-link'));

    await waitFor(() => {});
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
    };
    const stateWithItem = { values: { '1': mockItem } };

    expect(itemReducer(stateWithItem, toggleItem(mockItem))).toEqual(
      initialState,
    );
  });

  it('should handle removeItems', () => {
    const stateWithItems = {
      values: {
        '1': { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
        '2': { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
      },
    };

    expect(itemReducer(stateWithItems, removeItems())).toEqual(initialState);
  });
});
