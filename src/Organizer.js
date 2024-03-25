import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Organizer({ organizer_id }) {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate('create_event');
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
    <div>
      <h2>Data from Table: Events</h2>
      <table border="1">
        <thead>
          <tr>
            {/* Skip the first column */}
            {Object.keys(data[0]).slice(1).map((column, index) => (
              <th key={index}>{column}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {/* Skip the first value in each row */}
              {Object.values(row).slice(1).map((value, valueIndex) => (
                <td key={valueIndex}>{value}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(row)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingRecord && (
        <div>
          <h2>Edit Record</h2>
          <form onSubmit={handleEditSubmit}>
            <label>
              Event Name:
              <input
                type="text"
                value={editFormData.event_name}
                onChange={(e) => setEditFormData({ ...editFormData, event_name: e.target.value })}
                required
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
              />
            </label>
            <br />
            <label>
              Event Datetime:
              <input
                type="datetime-local"
                value={editFormData.event_datetime}
                onChange={(e) => setEditFormData({ ...editFormData, event_datetime: e.target.value })}
                required
              />
            </label>
            <br />
            <button type="submit">Save Changes</button>
          </form>
        </div>
      )}

      <button onClick={handleOnClick}>Create Event</button>
    </div>
  );
}

export default Organizer;