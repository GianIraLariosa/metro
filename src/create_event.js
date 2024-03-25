import axios from "axios";
import { useState } from "react";

function Create_Event ({ organizer_id }) {
    const [eventName, setEventName] = useState('');
//   const [organizerId, setOrganizerId] = useState('');
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
    <div>
      <h2>Create Event</h2>
      <form onSubmit={handleSubmit} method="POST">
        <label>
          Event Name:
          <input type="text" value={eventName} onChange={(e) => setEventName(e.target.value)} required />
        </label>
        <br />
        <label>
          Event Description:
          <textarea value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} required />
        </label>
        <br />
        <label>
          Event Date & Time:
          <input type="datetime-local" value={eventDateTime} onChange={(e) => setEventDateTime(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Create Event</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Create_Event;