import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Itemform from './Itemform';

describe('ItemForm Component', () => {
  it('should render the item creation form', () => {
    render(<ItemForm />);

    expect(screen.getByLabelText(/item name/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('should call the onSubmit function with the correct data when the form is submitted', () => {
    const mockOnSubmit = jest.fn();
    render(<ItemForm onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText(/item name/i), { target: { value: 'football' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(mockOnSubmit).toHaveBeenCalledWith({ name: 'football' });
  });

  it('should populate the form with initial data when provided', () => {
    const initialData = { name: 'basketball' };
    render(<ItemForm initialData={initialData} />);

    expect(screen.getByLabelText(/item name/i).value).toBe('basketball');
  });
});