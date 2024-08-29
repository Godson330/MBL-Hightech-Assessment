import React, { useState } from 'react';
import axios from 'axios';

function Login({ onLogin }) {
  // Define state variables for name and password
  const [name, setName] = useState(''); // Changed from username to name
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make an API call to authenticate the user
      const response = await axios.post('https://qa-test-9di7.onrender.com/login', {
        name, // Send the name field in the API request
        password,
      });

      // Extract the token from the response
      const token = response.data.token;

      // Store the token (e.g., in localStorage)
      localStorage.setItem('token', token);

      // Optionally, call onLogin with user data or token
      if (onLogin) {
        onLogin({ name, token });
      }

      // Clear the form fields
      setName('');
      setPassword('');
    } catch (error) {
      // Handle authentication errors
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Login Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
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
            required
          />
        </div>

        <button type="submit">Submit</button>

        {error && <p>{error}</p>} {/* Display error message */}
      </form>
    </div>
  );
}

export default Login;
