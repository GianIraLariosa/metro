import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserPage({ userId }) {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [events, setEvents] = useState([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    // Fetch events data
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost/metro%20events/events.php');
        if (response.data.success) {
          setEvents(response.data.events.map(event => ({ ...event, upvotes: 0, comments: [] })));
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


  const handleRequestSubmit = async () => {
    const formData = new FormData();
    formData.append('user_id', userId);
    try {
      const response = await axios.post('http://localhost/metro%20events/request_organizer.php', formData);
      console.log(response);

      if (response.data === 'Successfull') {
        setRequestSent(true);
      } else {
        setErrorMessage(response.data.message || 'Failed to send request. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  const handleUpvote = async (eventId) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('eventid', eventId);
    
    try {
      const response = await axios.post('http://localhost/metro%20events/handle_upvote.php', formData);
      console.log(response.data);
      const upvoteCount = response.data;
      if (response.data === 'Successfull') {
        setRequestSent(true);
        setErrorMessage(response.data.message || 'Upvote Successful');
      } else {
        setErrorMessage(response.data.message || 'Failed to Upvote');
      }
      setEvents(prevEvents => prevEvents.map(event => {
        if (event.id === eventId) {
          return { ...event, upvotes: upvoteCount };
        }
        return event;
      }));
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while upvoting. Please try again later.');
    }
  };
  
  const handleComment = async (eventId, comment) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('eventid', eventId);
    formData.append('comment', comment);
    try {
      const response = await axios.post('http://localhost/metro%20events/handle_comment.php', formData);
      console.log(response.data);
      setEvents(prevEvents => prevEvents.map(event => {
        if (event.id === eventId) {
          return { ...event, comments: [...event.comments, comment] };
        }
        return event;
      }));
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred while adding a comment. Please try again later.');
    }
  };

  const handleJoinEvent = async (eventid) => {
    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('eventid', eventid);
    try {
      console.log(userId + ", " +eventid);
      const response = await axios.post('http://localhost/metro%20events/join_event.php', formData);
      if (response.data.success) {
        setErrorMessage('Request sent successfully');
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
      width: '800px', 
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

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Event Name</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Description</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Date & Time</th>
            <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Actions</th>
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
                <button onClick={() => handleUpvote(event.id)}>Upvote ({event.upvotes})</button>
                <input 
                  type="text" 
                  placeholder="Add a comment" 
                  onChange={(e) => setCommentInput(e.target.value)} />
                <button onClick={() => handleComment(event.id, commentInput)}>Comment</button>
                <ul>
                  {event.comments.map((comment, index) => (
                    <li key={index}>{comment}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}
    </div>
  );
}

export default UserPage;
