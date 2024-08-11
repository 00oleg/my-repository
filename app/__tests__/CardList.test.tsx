/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import SearchResults from '../components/Result';
import { Provider } from 'react-redux';
import { createMockStore } from '../store/mockStore';

jest.mock('@remix-run/react', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
  useNavigate: jest.fn(),
}));

describe('CardList Component', () => {
  let store: ReturnType<typeof createMockStore>;

  beforeEach(() => {
    store = createMockStore({
      items: {
        values: [],
      },
    });
  });

  test('CardList component should render the correct number of cards', () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <SearchResults
          loading={false}
          results={[
            {
              uid: '1',
              name: 'Animal 1',
              earthAnimal: 'true',
              queryParams: {
                page: 1,
                perPage: 10,
                keywords: 'text query',
              },
            },
            {
              uid: '2',
              name: 'Animal 2',
              earthAnimal: 'false',
              queryParams: {
                page: 1,
                perPage: 10,
                keywords: 'text query',
              },
            },
            {
              uid: '3',
              name: 'Animal 3',
              earthAnimal: 'false',
              queryParams: {
                page: 1,
                perPage: 10,
                keywords: 'text query',
              },
            },
          ]}
          queryParams={{
            page: 1,
            perPage: 10,
            keywords: 'text query',
          }}
        />
      </Provider>,
    );

    const cards = getAllByTestId('card-list__item');
    expect(cards.length).toBe(3);
  });
});

test('CardList component should display a message if no cards are present', () => {
  const { getByText } = render(
    <SearchResults
      loading={false}
      results={[]}
      queryParams={{
        page: 1,
        perPage: 10,
        keywords: 'text query',
      }}
    />,
  );
  const noCardsMessage = getByText('No results');
  expect(noCardsMessage).toBeInTheDocument();
});

test('CardList component should display a loading', () => {
  const { getByText } = render(
    <SearchResults
      loading={true}
      results={[]}
      queryParams={{
        page: 1,
        perPage: 10,
        keywords: 'text query',
      }}
    />,
  );
  const noCardsMessage = getByText('Loading...');
  expect(noCardsMessage).toBeInTheDocument();
});
