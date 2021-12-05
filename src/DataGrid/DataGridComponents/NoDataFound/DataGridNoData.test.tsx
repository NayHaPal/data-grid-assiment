import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGridNoData from './DataGridNoData';

test('renders learn react link', () => {
  render(<DataGridNoData />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
