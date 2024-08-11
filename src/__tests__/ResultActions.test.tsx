/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ResultActions from '../components/ResultActions';
import { createMockStore } from '../store/mockStore';
import { Provider } from 'react-redux';

global.URL.createObjectURL = jest.fn(() => 'mocked-url');

describe('ResultActions Component', () => {
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

  test('ResultActions component have 2 buttons', () => {
    const { getByText } = render(
      <Provider store={store}>
        <ResultActions />
      </Provider>,
    );

    expect(getByText('Unselect all')).toBeInTheDocument();
    expect(getByText('Download')).toBeInTheDocument();
  });
});
