import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGridRow from './DataGridRows';

test('renders learn react link', () => {
  render(<DataGridRow />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
