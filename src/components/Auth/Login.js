import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './Login.css';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';

const Login = () => {
  const [{ user, isAuthenticated }, dispatch] = useStateValue();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const inputHandler = (event) => {
    event.preventDefault();
    setError('');
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else {
      setPassword(event.target.value);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('Kindly provide the credentials');
    } else if (email === '' && password === '') {
      setError('Kindly provide the credentials');
    } else {
      axios
        .post('/login', {
          email: email,
          password: password,
        })
        .then((data) => {
          dispatch({
            type: 'LOGIN',
            user: data.data,
          });
          setEmail('');
          setPassword('');
        })
        .catch((err) => {
          setError(err.response.data.msg);
        });
    }
  };

  if (isAuthenticated === true) {
    return <Navigate to='/home/pending' />;
  }

  return (
    <>
      <h5>Login</h5>
      <form className='form'>
        <div className='form__group field'>
          <input
            type='email'
            className='form__field'
            placeholder='Name'
            value={email}
            name='email'
            id='email'
            onChange={(e) => inputHandler(e)}
            required
          />
          <label for='email' className='form__label'>
            Email
          </label>
        </div>

        <div className='form__group field bottom'>
          <input
            type='password'
            className='form__field'
            placeholder='Name'
            value={password}
            name='password'
            id='pass'
            onChange={(e) => inputHandler(e)}
            required
          />
          <label for='pass' className='form__label'>
            Password
          </label>
        </div>

        <button type='submit' onClick={(e) => onLogin(e)} className='loginBtn'>
          Submit
        </button>
        <span className='error'>
          {error === '' ? null : <span>{error}</span>}
        </span>
      </form>
    </>
  );
};

export default Login;
