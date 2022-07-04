import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStateValue } from '../../StateProvider';

const Logout = () => {
  const [{ isAuthenticated }, dispatch] = useStateValue();

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch({
      type: 'LOGOUT',
    });
  };

  if (!isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <button className='logout' onClick={logoutHandler}>
      Logout
    </button>
  );
};

export default Logout;
