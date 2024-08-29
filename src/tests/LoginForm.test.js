import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from './LoginForm';

test('renders login form', function() {
  render(<LoginForm />);
  
  // Check for username input field
  expect(screen.getByLabelText(/joe2/i)).toBeInTheDocument();
  
  // Check for password input field
  expect(screen.getByLabelText(/josh/i)).toBeInTheDocument();
});