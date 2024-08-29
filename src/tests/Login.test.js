import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from './Login';

jest.mock('axios');

describe('Login Component', () => {
  it('should handle login and store token', async () => {
    // Mock the API response
    axios.post.mockResolvedValue({ data: { token: 'mocked_token' } });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'joe2' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'josh' } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mocked_token');
    });
  });

  it('should display error message on login failure', async () => {
    // Mock the API to fail
    axios.post.mockRejectedValue(new Error('Login failed'));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'joe2' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'josh' } });
    fireEvent.click(screen.getByText(/submit/i));

    await waitFor(() => {
      expect(screen.getByText(/login failed/i)).toBeInTheDocument();
    });
  });
});
