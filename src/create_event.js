import React, { useState } from 'react';
import axios from 'axios';

const Create_Event = ({ organizer_id, onClose }) => {
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost/metro%20events/create_event.php', {
        event_name: eventName,
        organizer: organizer_id,
        event_description: eventDescription,
        event_datetime: eventDateTime,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }});
      console.log(response);
      setMessage(response.data);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div style={{ 
      backgroundColor: '#ACE2E1', 
      padding: '10px', 
      borderRadius: '8px', 
      width: '300px', 
      margin: 'auto',
      fontFamily: 'Lato, sans-serif' 
    }}>
      <h2 style={{ color: '#008DDA', textAlign: 'center' }}>Create Event</h2>
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
          <div style={{ margin: 'auto', width: '250px' }}>
            <label style={{ color: '#008DDA', display: 'block' }}>Event Name:</label>
            <input
              type="text"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
            />
          </div>
        <br />
          <div style={{ margin: 'auto', width: '250px' }}>
            <label style={{ color: '#008DDA', display: 'block' }}>Description:</label>
            <textarea
              value={eventDescription}
              onChange={(e) => setEventDescription(e.target.value)}
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
            />
          </div>
        <br />
          <div style={{ margin: 'auto', width: '250px' }}>
            <label style={{ color: '#008DDA', display: 'block' }}>Date & Time:</label>
            <input
              type="datetime-local"
              value={eventDateTime}
              onChange={(e) => setEventDateTime(e.target.value)}
              required
              style={{ width: '100%', padding: '5px', borderRadius: '4px', border: '1px solid #41C9E2' }}
            />
          </div>
        <br />
        <div style={{ marginTop: '10px' }}>
          <button type="submit" style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }}>Create</button>
        </div>
      </form>
      <p style={{ color: '#008DDA', textAlign: 'center', marginTop: '10px' }}>{message}</p>
    </div>
  );
}

export default Create_Event;
