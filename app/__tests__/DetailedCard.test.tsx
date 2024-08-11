/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../components/Details';
import { Provider } from 'react-redux';
import { createMockStore } from '../store/mockStore';
import { useItemDetailQuery } from '../services/api';
import { useNavigate } from '@remix-run/react';

jest.mock('@remix-run/react', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));

jest.mock('../services/api', () => ({
  useItemDetailQuery: jest.fn(),
}));

describe('DetailedCard', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [],
      },
    });
  });

  test('DetailedCard component a loading indicator is displayed while fetching data', async () => {
    const mockNavigate = jest.fn();

    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: {
        animal: {
          uid: 'ANMA0000264633',
          name: 'Abalone',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
      error: null,
      isLoading: true,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
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
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('DetailedCard component correctly displays the detailed card data', async () => {
    const mockNavigate = jest.fn();

    (useItemDetailQuery as jest.Mock).mockReturnValue({
      data: {
        animal: {
          uid: 'ANMA0000264633',
          name: 'Abalone',
          earthAnimal: true,
          earthInsect: false,
          avian: false,
          canine: false,
          feline: false,
        },
      },
      error: null,
      isLoading: false,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { getByText } = render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
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
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Abalone')).toBeInTheDocument();
      expect(getByText('ANMA0000264633')).toBeInTheDocument();
    });
  });

  test('DetailedCard component clicking the close button hides the component', async () => {
    const mockNavigate = jest.fn();

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { container } = render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
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
        />
      </Provider>,
    );

    expect(container.querySelector('.detail-page')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockNavigate).toHaveBeenCalledWith(
      '/search?searchTerm=&page=1&per_page=10',
    );
  });
});
