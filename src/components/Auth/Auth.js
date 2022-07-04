import React from 'react';
import './Auth.css';
import { Link, Routes, Route, Outlet, NavLink } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Home from '../Home/Home/Home';

const Auth = () => {
  return (
    <div className='auth'>
      <div className='title'>Task Tracker</div>
      <div className='auth__header'>
        <NavLink
          className={({ isActive }) => (isActive ? 'authlink-active' : 'link')}
          to='/'
        >
          Login
        </NavLink>

        <NavLink
          className={({ isActive }) => (isActive ? 'authlink-active' : 'link')}
          to='/register'
        >
          Register
        </NavLink>
      </div>
      <Outlet />
      {/* 
      <div>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      </div> */}
    </div>
  );
};

export default Auth;
