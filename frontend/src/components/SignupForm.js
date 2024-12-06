import React, { useState } from 'react';
import axios from 'axios';

const SignupForm = ({ onSignupSuccess, toggleForm }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/register', {
        username,
        email,
        password,
      });

      if (response.data.success) {
        setSuccess('User registered successfully!');
        setError('');
        setTimeout(() => {
          onSignupSuccess(); // Notify App component of successful signup
        }, 1000);
      } else {
        setError(response.data.message || 'Registration failed. Try again.');
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Signup error:', err);
    }
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
      {success && <p>{success}</p>}
      {error && <p>{error}</p>}
      <p>
        Already have an account? <button onClick={toggleForm}>Login</button>
      </p>
    </div>
  );
};

export default SignupForm;
