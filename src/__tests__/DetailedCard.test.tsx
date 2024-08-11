/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../components/Details';
import { Provider } from 'react-redux';
import { createMockStore } from '../store/mockStore';
import { useItemDetailQuery } from '../services/api';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
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

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
          }}
        />
      </Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });

  test('DetailedCard component correctly displays the detailed card data', async () => {
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

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      push: jest.fn(),
    });

    const { getByText } = render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
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
    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      query: { page: '1' },
      replace: mockReplace,
    });

    const { container } = render(
      <Provider store={store}>
        <DetailPage
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: '',
            details: 'ANMA0000264633',
          }}
        />
      </Provider>,
    );

    expect(container.querySelector('.detail-page')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('close-button'));
    expect(mockReplace).toHaveBeenCalledWith(
      'undefined/?searchTerm=&page=1&per_page=10',
    );
  });
});
