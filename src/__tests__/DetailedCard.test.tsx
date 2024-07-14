/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import DetailPage from '../pages/Detail';

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

  test('DetailedCard component a loading indicator is displayed while fetching data', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <DetailPage />
      </MemoryRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('DetailedCard component correctly displays the detailed card data', async () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <DetailPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getByText('Abalone')).toBeInTheDocument();
      expect(getByText('ANMA0000264633')).toBeInTheDocument();
    });
  });

  test('DetailedCard component clicking the close button hides the component', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/details?page=1&detail=ANMA0000264633']}>
        <Routes>
          <Route path="details" element={<DetailPage />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(container.querySelector('.detail-page')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('close-button'));

    await waitFor(() => {
      expect(container.querySelector('.detail-page')).not.toBeInTheDocument();
    });
  });
});
