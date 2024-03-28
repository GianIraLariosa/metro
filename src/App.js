import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Organizer from './Organizer';
import Login from './login'
import Create_Event from './create_event';
import CreateUser from './Create_user';
import User from './User';
import Admin from './Admin';

function App() {
  const [user_id, setUserid] = useState('');
  const [admin_id, setAdminid] = useState('');
  const [organizer_id, setOrgid] = useState('');
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login setUserid={setUserid} setAdminid={setAdminid} setOrgid={setOrgid}/>} />
          <Route path="/organizer" element={<Organizer organizer_id={organizer_id}/>} />
          <Route path='/organizer/create_event' element={<Create_Event organizer_id={organizer_id}/>} />
          <Route path='/register' element={<CreateUser/>}/>
          <Route path='user' element={<User userId = {user_id}/>}/>
          <Route path='admin' element={<Admin user_id={user_id}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
