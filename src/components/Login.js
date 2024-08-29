import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API call to authenticate the user
      const response = await axios.post('https://qa-test-9di7.onrender.com/login', {
        username,
        password,
      });

      // Extract the token from the response
      const token = response.data.token;

      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);

      // Optionally, call onLogin with user data or token
      if (onLogin) {
        onLogin({ username, token });
      }

      // Clear the form fields
      setUsername('');
      setPassword('');
    } catch (error) {
      // Handle authentication errors
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Submit</button>

        {error && <p>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
}

export default Login;