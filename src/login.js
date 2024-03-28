import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUserid, setAdminid, setOrgid }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost/metro%20events/login.php', {
        params: {
          username, 
          password,
        },
      });

      console.log(response.data.user.user_id);
      if (response.data.message) {
        if (response.data.message === 'organizer') {
          setOrgid(response.data.user);
          navigate('/organizer');
        } else {
          setUserid(response.data.user.user_id);
          setMessage(response.data.message);
          navigate('/user');
        }
      } else if (response.data.error) {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#ACE2E1', 
      padding: '40px', 
      borderRadius: '8px', 
      width: '400px', 
      margin: 'auto',
      position: 'absolute' ,
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
      fontFamily: 'Lato, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#008DDA' }}>Welcome to Metro Events!</h1>
      <form onSubmit={handleLogin}>

      <div style={{ margin: 'auto', width: '250px' }}>
        <label style={{ color: '#008DDA', display: 'block' }}>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
        />
      </div>
      <br></br>
      <div style={{ margin: 'auto', width: '250px' }}>
        <label style={{ color: '#008DDA', display: 'block' }}>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
        />
      </div>


        <button type="submit" style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', marginTop: '10px', cursor: 'pointer' }}>Login</button>
      </form>

      <p style={{ color: '#008DDA', textAlign: 'center', marginTop: '10px' }}>{message}</p>
      <div style={{ textAlign: 'center', marginTop: '10px' }}>
        <p style={{ display: 'inline', textDecoration: 'none', color: '#FFFFFF', marginRight: '5px' }}>Don't have an account?</p>
        <a href="/register" style={{ textDecoration: 'none', color: '#41C9E2' }}>Register Now!</a>
      </div>
    </div>
  );
}

export default Login;
