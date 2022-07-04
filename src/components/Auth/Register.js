import React, { useState } from 'react';
import './Register.css';
import axios from '../../axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [confirmpassword, setConfirmPassword] = useState('');

  const inputHandler = (event) => {
    setError('');
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    } else if (event.target.name === 'name') {
      setName(event.target.value);
    } else {
      setConfirmPassword(event.target.value);
    }
  };

  const onRegister = (e) => {
    e.preventDefault();
    if (
      name === '' ||
      email === '' ||
      password === '' ||
      confirmpassword === ''
    ) {
      setError('Kindly provide your info.');
    } else if (
      name === '' &&
      email === '' &&
      password === '' &&
      confirmpassword === ''
    ) {
      setError('Kindly provide your info.');
    } else if (password !== confirmpassword) {
      setError('Password does not match');
    } else {
      axios
        .post('/register', {
          name: name,
          email: email,
          password: password,
        })
        .then((data) => {
          setEmail('');
          setName('');
          setPassword('');
          setConfirmPassword('');
          setError(data.data.msg);
        })
        .catch((err) => {
          setError(err.response.data.msg);
        });
    }
  };

  return (
    <>
      <form className='form'>
        <div className='regform__group regfield'>
          <input
            type='text'
            className='form__field'
            placeholder='Name'
            value={name}
            name='name'
            id='name'
            onChange={(e) => inputHandler(e)}
            required
          />
          <label for='name' className='form__label'>
            Name
          </label>
        </div>

        <div className='regform__group regfield'>
          <input
            type='email'
            className='form__field'
            placeholder='Email'
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

        <div className='regform__group regfield'>
          <input
            type='password'
            className='form__field'
            placeholder='Password'
            value={password}
            name='password'
            id='password'
            onChange={(e) => inputHandler(e)}
            required
          />
          <label for='password' className='form__label'>
            Password
          </label>
        </div>

        <div className='regform__group regfield'>
          <input
            type='password'
            className='form__field'
            placeholder='Name'
            value={confirmpassword}
            name='confirmpassword'
            id='confirmpassword'
            onChange={(e) => inputHandler(e)}
            required
          />
          <label for='confirmpassword' className='form__label'>
            Confirm Password
          </label>
        </div>

        <button className='regBtn' onClick={(e) => onRegister(e)} type='submit'>
          Submit
        </button>
        <span className='error'>
          {error === '' ? null : <span>{error}</span>}
        </span>
      </form>
    </>
  );
};

export default Register;
