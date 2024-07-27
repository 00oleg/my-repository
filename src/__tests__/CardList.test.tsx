/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '../components/Result';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { itemReducer } from '../store/itemReducer';

const store = configureStore({
  reducer: {
    items: itemReducer,
  },
});

test('CardList component should render the correct number of cards', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <Provider store={store}>
        <SearchResults
          loading={false}
          results={[
            { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
            { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
            { uid: '3', name: 'Animal 3', earthAnimal: 'false' },
          ]}
          pageNumber={1}
        />
      </Provider>
    </MemoryRouter>,
  );

  const cards = getAllByTestId('card-list__item');
  expect(cards.length).toBe(3);
});

test('CardList component should display a message if no cards are present', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <SearchResults loading={false} results={[]} pageNumber={1} />
    </MemoryRouter>,
  );
  const noCardsMessage = getByText('No results');
  expect(noCardsMessage).toBeInTheDocument();
});

test('CardList component should display a loading', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/']}>
      <SearchResults loading={true} results={[]} pageNumber={1} />
    </MemoryRouter>,
  );
  const noCardsMessage = getByText('Loading...');
  expect(noCardsMessage).toBeInTheDocument();
});
