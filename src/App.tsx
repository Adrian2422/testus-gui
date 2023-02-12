import React from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import Login from './app/views/auth/login';

function App() {
  return (
      <Routes location={location} key={location.pathname}>
          <Route path='/login' element={<Login />} />
      </Routes>
  );
}

export default App;
