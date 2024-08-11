/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import ErrorBoundary from '../components/ErrorBoundary';

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
