import React, { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import axios from '../../axios';
import setAuthToken from '../../setAuthToken';
import { useStateValue } from '../../StateProvider';
import './Create.css';

const Create = () => {
  const [task, setTask] = useState('');
  const [frequency, setFrequency] = useState('');
  const [error, setError] = useState('');
  const [user] = useOutletContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const onAddTask = (e) => {
    e.preventDefault();
    if (task === '' || frequency === '') {
      setError('Kindly fill proper details');
    } else {
      axios
        .post(
          '/todo/add-todo',
          {
            name: user.user.name,
            todo: task,
            frequency: frequency,
            status: false,
          },
          {
            headers: {
              'x-auth-token': user.token,
            },
          }
        )
        .then((data) => {
          setTask('');
          setFrequency('');
          setError('Task Added');
        })
        .catch((err) => {
          console.log(err);
          setError('Some Error Occurred, Try again later');
        });
    }
  };

  const onUpdateTask = (e) => {
    e.preventDefault();
    if (task === '' || frequency === '') {
      setError('Kindly fill proper details');
    } else {
      axios
        .post(
          `/todo/update-todo/${id}`,
          {
            name: user.user.name,
            todo: task,
            frequency: frequency,
            status: false,
          },
          {
            headers: {
              'x-auth-token': user.token,
            },
          }
        )
        .then((data) => {
          setError('Task Added');
          navigate('/home/pending');
        })
        .catch((err) => {
          console.log(err);
          setError('Some Error Occurred, Try again later');
        });
    }
  };

  useEffect(() => {
    console.log(id);
    if (id) {
      if (user.token) {
        setAuthToken(user.token);
      }
      axios
        .get(`/todo/get-todo/${id}`)
        .then((data) => {
          setTask(data.data.todo);
          setFrequency(data.data.frequency);
        })
        .catch((err) => {});
    } else {
    }
  }, []);

  const onTaskHandler = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };

  const onSelectHandler = (e) => {
    e.preventDefault();
    setFrequency(e.target.value);
  };

  return (
    <div>
      <form className='create_form'>
        <div>
          <textarea
            name='task'
            value={task}
            onChange={onTaskHandler}
            id=''
            cols='100'
            placeholder='Enter Task'
            rows='10'
          ></textarea>
        </div>

        <div>
          <label className='labeltype'>Type of task:</label>
          <select onChange={onSelectHandler} value={frequency}>
            <option value='Daily'>Daily</option>
            <option value='Weekly'>Weekly</option>
            <option value='Monthly'>Monthly</option>
            <option value='Yearly'>Yearly</option>
          </select>
        </div>

        {id ? (
          <input onClick={onUpdateTask} type='submit' value='Update Task' />
        ) : (
          <input onClick={(e) => onAddTask(e)} type='submit' value='Add task' />
        )}

        <p>{error}</p>
      </form>
    </div>
  );
};

export default Create;
