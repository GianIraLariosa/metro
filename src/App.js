import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Organizer from './Organizer';
import Login from './login'
import Create_Event from './create_event';

function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path="/organizer" element={<Organizer />} />
          <Route path='/organizer/create_event' element={<Create_Event />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
