import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGridHeader from './DataGridHeader';

test('renders learn react link', () => {
  render(<DataGridHeader />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
