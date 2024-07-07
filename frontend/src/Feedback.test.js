// src/Feedback.test.js
import React from 'react';
import Feedback from './Feedback'; // Corrected import path
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

test('renders Feedback component', () => {
  render(<Feedback />);
  const linkElement = screen.getByText(/Library Feedback/i); // Adjust text to match component
  expect(linkElement).toBeInTheDocument();
});
