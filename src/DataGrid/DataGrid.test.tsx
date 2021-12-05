import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGrid from './DataGrid';

test('renders learn react link', () => {
  render(<DataGrid />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
