import React from 'react';
import { render, screen } from '@testing-library/react';
import DataGridFooter from "./DataGridFooter";

test('renders learn react link', () => {
  render(<DataGridFooter />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
