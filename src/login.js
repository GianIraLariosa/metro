import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

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

      console.log(response.data);
      if (response.data.message) {
        // Login successful, navigate to appropriate page
        if (response.data.message === 'organizer') {
          navigate('/organizer');
        } else {
          setMessage(response.data.message);
        }
      } else if (response.data.error) {
        // Login failed, display error message
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };
    return(
        <div>
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

export default Login;