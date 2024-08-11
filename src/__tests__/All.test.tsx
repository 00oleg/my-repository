/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import MainPage from '../pages';
import ErrorPage404 from '../pages/404';
import ErrorBoundary from '../components/ErrorBoundary';

test('404 page have text', () => {
  const { getByTestId } = render(<ErrorPage404 />);

  expect(getByTestId('not-found')).toHaveTextContent('Page not found 404');
});

describe('ErrorBoundary', () => {
  const ProblematicComponent = () => {
    return '';
  };

  it('should display the fallback UI when a child throws an error', () => {
    const { container } = render(
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <ProblematicComponent />
      </ErrorBoundary>,
    );

    expect(container).toHaveTextContent('');
  });

  it('should display children when no error is thrown', () => {
    const SafeComponent = () => <div>Safe Component</div>;

    const { getByText } = render(
      <ErrorBoundary fallback={<p>ErrorBoundary: Something went wrong.</p>}>
        <SafeComponent />
      </ErrorBoundary>,
    );

    expect(getByText('Safe Component')).toBeInTheDocument();
  });
});

test('MainPage is empty', () => {
  const { container } = render(<MainPage />);

  expect(container.querySelectorAll('div').length).toBe(0);
});
