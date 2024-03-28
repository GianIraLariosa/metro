import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage({ userId }) {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch events data
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost/metro%20events/events.php');
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          setErrorMessage(response.data.message || 'Failed to fetch events.');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrorMessage('An error occurred while fetching events.');
      }
    }
    fetchEvents();
  }, []);


  let formData = new FormData();


  const handleRequestSubmit = async () => {
  formData = new FormData();
  formData.append('user_id', userId);
    try {
      const response = await axios.post('http://localhost/metro%20events/request_organizer.php', formData);
      console.log(response);

      if (response.data == 'Successfull') {
        setRequestSent(true);
      } else {
        setErrorMessage(response.data.message || 'Failed to send request. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };
  
  const handleJoinEvent = async (eventid) => {
    
  formData = new FormData();
  formData.append('user_id', userId);
  formData.append('eventid', eventid);
    try {
      console.log(userId + ", " +eventid);
      const response = await axios.post('http://localhost/metro%20events/join_event.php', formData);
      if (response.data.success) {
        // Handle success, e.g., show a confirmation message
      } else {
        setErrorMessage(response.data.message || 'Failed to join event. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while joining event. Please try again later.');
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

<table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Event Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id}>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{event.name}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{event.description}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>{event.date}</td>
              <td style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                <button onClick={() => handleJoinEvent(event.id)}>Join Event</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserPage;
