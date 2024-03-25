import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import './App.css';

function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [message, setMessage] = useState('');

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Send user data to the backend using Axios POST request
    try {
      const response = await axios.post('http://localhost/metro events/create_user.php', {
        action: 'create_update',
        name: username,
        password: password,
        firstname: firstname,
        lastname: lastname,
      });

      setMessage(response.data); // Assuming the PHP script echoes a message

      // Clear form fields after successful submission
      setUsername('');
      setPassword('');
      setFirstname('');
      setLastname('');
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="App">
      <h1>Create User</h1>
      <form onSubmit={handleCreateUser}>
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
        <label>
          First Name:
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default CreateUser;
