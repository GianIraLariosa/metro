import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterUser = ({ setUserid, setAdminid, setOrgid }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);

        try {
            const response = await axios.post('http://localhost/metro events/create_user.php', formData);

            console.log(response);

            if (response.data) {
                setMessage(response.data);
                navigate('/');
            } else if (response.data.error) {
                setMessage(response.data.error);
            }
        } catch (error) {
            setMessage('Error submitting the form');
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
            fontFamily: 'Lato, sans-serif' 
        }}>
            <h2 style={{ textAlign: 'center', color: '#008DDA' }}>Start your journey here at</h2>
            <h2 style={{ textAlign: 'center', color: '#008DDA' }}>Metro Events!</h2>
            <form onSubmit={handleSubmit}>

                <div style={{ margin: 'auto', width: '250px' }}>
                    <label style={{ color: '#008DDA', display: 'block' }}>First Name:</label>
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
                    />
                </div>
                <br></br>
                <div style={{ margin: 'auto', width: '250px' }}>
                    <label style={{ color: '#008DDA', display: 'block' }}>Last Name:</label>
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
                    />
                </div>
                <br></br>
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
                <button type="submit" style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', marginTop: '10px', cursor: 'pointer' }}>Register</button>
            </form>

            <p style={{ color: '#008DDA', textAlign: 'center', marginTop: '10px' }}>{message}</p>

            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <p style={{ display: 'inline', textDecoration: 'none', color: '#FFFFFF', marginRight: '5px' }}>Already have an account?</p>
                <a href="/" style={{ textDecoration: 'none', color: '#41C9E2' }}>Login</a>
            </div>
        </div>
    );
};

export default RegisterUser;
