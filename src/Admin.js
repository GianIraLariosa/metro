import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin( { user_id } ) {
    const [requests, setRequests] = useState([]);


    const formdata = new FormData();


    const Approve = (number) => {

        formdata.append('user_id', number);

        axios.post('http://localhost/metro events/create_organizer.php', formdata)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error('Error approving user: ', err);
        });
    }

    useEffect(() => {
        // Make API call using Axios
        axios.get('http://localhost/metro%20events/organizer_requests.php?table=requests', {
            params: {
                table: 'requests',
            }
        })
        .then(response => {
            // Update state with fetched data
            console.log(response);
            setRequests(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []); // Empty dependency array ensures the effect runs only once on component mount

    return (
        <div>
            <h1>Admin Page</h1>
            <table>
                <thead>
                    <tr>
                        <th>Request ID</th>
                        <th>Date and Time</th>
                        <th>User ID</th>
                        <th>Approval</th>
                        {/* Add more table headers as needed */}
                    </tr>
                </thead>
                <tbody>
                    {requests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.request_id}</td>
                            <td>{request.dateTime}</td>
                            <td>{request.user_id}</td>
                            <td><button onClick={ () => Approve(request.user_id)}>Approve</button></td>
                            {/* Render additional columns as needed */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Admin;
