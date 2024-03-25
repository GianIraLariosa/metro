import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Send login credentials to the backend using Axios GET request
    try {
      const response = await axios.get('http://localhost/metro%20events/login.php', {
        params: {
          username,
          password,
        },
      });

      console.log(response)

      if (response.data.message) {
        // Login successful, display message
        setMessage(response.data.message);
      } else if (response.data.error) {
        // Login failed, display error message
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default App;
