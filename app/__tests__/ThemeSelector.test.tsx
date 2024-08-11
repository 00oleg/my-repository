/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import ThemeSelector from '../components/ThemeSelector';

jest.mock('../ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeSelector Component', () => {
  const { useTheme } = require('../ThemeContext');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with dark theme selected', () => {
    useTheme.mockReturnValue({
      theme: 'dark',
      toggleTheme: jest.fn(),
    });

    render(<ThemeSelector />);
    expect(screen.getByLabelText('Dark')).toBeChecked();

    expect(screen.getByLabelText('Light')).not.toBeChecked();
  });

  test('renders with light theme selected', () => {
    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: jest.fn(),
    });

    render(<ThemeSelector />);

    expect(screen.getByLabelText('Light')).toBeChecked();
    expect(screen.getByLabelText('Dark')).not.toBeChecked();
  });

  test('calls toggleTheme on radio button change', () => {
    const toggleThemeMock = jest.fn();

    useTheme.mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });

    render(<ThemeSelector />);

    fireEvent.click(screen.getByLabelText('Dark'));
    expect(toggleThemeMock).toHaveBeenCalledWith('dark');
  });
});
