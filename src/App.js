import { useEffect, useState } from 'react';
import './App.css'; 
import { io } from 'socket.io-client';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Forgot from './pages/forgot password/Forgot';
import Home from './pages/home/Home.js';
import {BrowserRouter,Route,Link,Routes,Navigate} from 'react-router-dom'
import Dropdown from 'react-bootstrap/Dropdown'
// import { useState } from 'react';

function App() {


  return (
    <div className="App">

      <BrowserRouter>
        <nav>
          <Link to="/login">login</Link>
          <Link to="/register">register</Link>
          <Link to="/Forgot">forgot</Link>
          <Link to="/home">home</Link>
        </nav>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/forgot' element={<Forgot/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
