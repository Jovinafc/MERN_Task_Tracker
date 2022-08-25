import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { useStateValue } from '../../../StateProvider';
import Logout from '../../Auth/Logout';
import './Home.css';

const Home = () => {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div>
      <header>
        <p className='titlep'>Task Tracker</p>
        <Logout />
      </header>
      <div className='home__tasks'>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'navlink')}
          to='/home/create'
        >
          Create a Task
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'navlink')}
          to='/home/pending'
        >
          Pending Task
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? 'link-active' : 'navlink')}
          to='/home/complete'
        >
          Completed Task
        </NavLink>
      </div>
      <Outlet context={[user]} />
    </div>
  );
};

export default Home;
