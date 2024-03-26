import React, { useState } from 'react';
import axios from 'axios';

function UserPage({ userId }) {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRequestSubmit = async () => {
    
    try {
      const response = await axios.post('http://localhost/metro%20events/request_organizer.php', {
        userId: userId,
      });
      if (response.data.success) {
        setRequestSent(true);
      } else {
        setErrorMessage(response.data.message || 'Failed to send request. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
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
      fontFamily: 'Lato, sans-serif' }}
    >
      <h1 style={{ textAlign: 'center', color: '#008DDA' }}>Welcome User!</h1>
      <p style={{ textAlign: 'center' }}>You are logged in as User</p>
      
      {!requestSent && (
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={handleRequestSubmit} 
            style={{
              backgroundColor: '#41C9E2',
              color: '#F7EEDD',
              padding: '8px 20px',
              borderRadius: '4px',
              border: 'none',
              marginTop: '20px',
              cursor: 'pointer'
            }}
          >
            Request to be an Organizer
          </button>
          {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        </div>
      )}

      {requestSent && (
        <p style={{ textAlign: 'center', color: 'green', marginTop: '20px' }}>
          Request sent successfully. We will review your request soon.
        </p>
      )}
    </div>
  );
}

export default UserPage;
