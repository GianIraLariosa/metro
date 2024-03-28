import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventPopup from "./component/CreateEventPopup";

function Organizer({ organizer_id }) {
  const navigate = useNavigate();
  const [popupOpen, setPopupOpen] = useState(false);

  const handleOnClick = () => {
    setPopupOpen(true);
  }

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // State for editing
  const [editingRecord, setEditingRecord] = useState(null);
  const [editFormData, setEditFormData] = useState({
    event_name: '',
    event_description: '',
    event_datetime: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log(organizer_id)
      try {
        const response = await axios.get(`http://localhost/metro%20events/get_table.php?table=event&organizer_id=${organizer_id}`);
        console.log(response.data);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchData();
  }, [organizer_id, data]);

  // Handle edit action
  const handleEdit = (record) => {
    setEditingRecord(record);
    setEditFormData({
      event_name: record.event_name,
      event_description: record.event_description,
      event_datetime: record.event_datetime,
    });
  };

  // Handle form submission for editing
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
    
        const newValues = `event_name=${editFormData.event_name}, event_description=${editFormData.event_description}, event_datetime=${editFormData.event_datetime}`;
        const response = await axios.get(`http://localhost/metro%20events/update_record.php?table=event&pk_name=event_id&pk_value=${editingRecord.event_id}&new_values=${newValues}`);
      console.log(editFormData.event_datetime + "shdflksdjflkjksd");
      // Update the edited record in the local state or refetch the data
      // Clear the editing state
      setEditingRecord(null);
      setEditFormData({
        event_name: '',
        event_description: '',
        event_datetime: '',
      });
    } catch (error) {
      console.error('Error:', error);
      setError('Error updating record');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (data.length === 0) {
    return <p>No data available in the table.</p>;
  }

  return (
    <div style={{ 
      backgroundColor: '#ACE2E1', 
      padding: '40px', 
      borderRadius: '8px', 
      width: 'fit-content', 
      margin: 'auto',
      position: 'absolute',
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', 
      fontFamily: 'Lato, sans-serif' }}>
      <h2 style={{ color: '#008DDA' }}>Create/Modify Events</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '2px solid #000000', padding: '10px' }}>Event</th>
            <th style={{ borderBottom: '2px solid #000000', padding: '10px' }}>Organizer</th>
            <th style={{ borderBottom: '2px solid #000000', padding: '10px' }}>Description</th>
            <th style={{ borderBottom: '2px solid #000000', padding: '10px' }}>Date & Time</th>
            <th style={{ borderBottom: '2px solid #000000', padding: '10px' }}>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{ borderBottom: '1px solid #000000' }}>
              {Object.values(row).slice(1).map((value, valueIndex) => (
                <td key={valueIndex} style={{ padding: '10px' }}>{value}</td>
              ))}
              <td style={{ padding: '10px' }}>
                <button style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer' }} onClick={() => handleEdit(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    
      {/* Edit Form */}
      {editingRecord && (
        <div style={{ marginTop: '20px' }}>
          <h2 style={{ color: '#008DDA' }}>Edit Record</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Event Name:
              <input
                type="text"
                value={editFormData.event_name}
                onChange={(e) => setEditFormData({ ...editFormData, event_name: e.target.value })}
                required
                className="edit-input"
              />
            </label>
            <br />
            <label>
              Event Description:
              <input
                type="text"
                value={editFormData.event_description}
                onChange={(e) => setEditFormData({ ...editFormData, event_description: e.target.value })}
                required
                className="edit-input"
              />
            </label>
            <br/>
            <label>
              Event Datetime:
              <input
                type="datetime-local"
                value={editFormData.event_datetime}
                onChange={(e) => setEditFormData({ ...editFormData, event_datetime: e.target.value })}
                required
                className="edit-input"
              />
            </label>
            <br />
            <button type="submit" style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Save Changes</button>
          </form>
        </div>
      )}
      <div>
        <button onClick={handleOnClick} style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', marginTop: '20px', cursor: 'pointer' }}>Create Event</button>
        {popupOpen && <EventPopup organizer_id={organizer_id} onClose={handleClosePopup} />}
      </div>
      {/* <button onClick={handleOnClick} style={{ backgroundColor: '#41C9E2', color: '#F7EEDD', padding: '8px 20px', borderRadius: '4px', border: 'none', marginTop: '20px', cursor: 'pointer' }}>Create Event</button> */}
    </div>
  );
}

export default Organizer;