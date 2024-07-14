/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SearchResults from '../components/Result';

test('CardList component should render the correct number of cards', () => {
  const { getAllByTestId } = render(
    <MemoryRouter initialEntries={['/']}>
      <SearchResults
        loading={false}
        results={[
          { uid: '1', name: 'Animal 1', earthAnimal: 'true' },
          { uid: '2', name: 'Animal 2', earthAnimal: 'false' },
          { uid: '3', name: 'Animal 3', earthAnimal: 'false' },
        ]}
        pageNumber={1}
      />
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
