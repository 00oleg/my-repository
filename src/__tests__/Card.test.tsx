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

test('Card component should render the card data', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <Card
        {...{ uid: '1', name: 'Animal 1', earthAnimal: 'true', pageNumber: 1 }}
      />
    </MemoryRouter>,
  );

  const name = getByText('Animal 1');
  expect(name).toBeInTheDocument();
  const earth = getByText('Earth Animal: Yes');
  expect(earth).toBeInTheDocument();
});

describe('DetailPage', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          animal: {
            uid: 'ANMA0000264633',
            name: 'Abalone',
            earthAnimal: true,
            earthInsect: false,
            avian: false,
            canine: false,
            feline: false,
          },
        }),
    } as Response);
  });

  test('Clicking on a card opens a detailed card component', async () => {
    const { container } = render(
      <BrowserRouter>
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
      </BrowserRouter>,
    );

    fireEvent.click(screen.getByTestId('card-list__item-link'));

    await waitFor(() => {
      expect(container.querySelector('.detail-page')).toBeInTheDocument();
    });
  });
});

describe('DetailPage', () => {
  const mockFetch = jest.fn();

  beforeEach(() => {
    global.fetch = mockFetch.mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          animal: {
            uid: 'ANMA0000264633',
            name: 'Abalone',
            earthAnimal: true,
            earthInsect: false,
            avian: false,
            canine: false,
            feline: false,
          },
        }),
    } as Response);
  });

  test('Clicking on a card opens a detailed card component and triggers an API call', async () => {
    render(
      <BrowserRouter>
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
      </BrowserRouter>,
    );

    expect(global.fetch).toHaveBeenCalledWith(
      'https://stapi.co/api/v1/rest/animal?uid=1',
      {
        method: 'GET',
      },
    );
  });
});
