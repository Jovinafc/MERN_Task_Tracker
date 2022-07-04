import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from '../../axios';
import setAuthToken from '../../setAuthToken';
import { useStateValue } from '../../StateProvider';
import Task from './Task';
import './Todo.css';

const Todo = () => {
  const [user] = useOutletContext();
  const [task, setTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState(task);
  const [search, setSearch] = useState('');
  const [{}, dispatch] = useStateValue();

  const getTasks = () => {
    if (user.token) {
      setAuthToken(user.token);
    }
    axios
      .get('/todo/get-todo')
      .then((data) => {
        if (data.data.msg !== undefined) {
          dispatch({
            type: 'LOGOUT',
          });
        }
        setTask(data.data);
        setFilteredTask(data.data);
      })
      .catch((err) => {
        if (err.response.data.msg === 'Invalid') {
          dispatch({
            type: 'LOGOUT',
          });
        }
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const onDelete = (e, id) => {
    e.preventDefault();
    dispatch({
      type: 'SPINNER_DISPLAY',
    });
    if (user.token) {
      setAuthToken(user.token);
    }
    axios
      .delete(`/todo/remove-todo/${id}`)
      .then((data) => {
        getTasks();
      })
      .then((d) => {
        dispatch({
          type: 'STOP_SPINNER',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onComplete = (e, id) => {
    e.preventDefault();
    dispatch({
      type: 'SPINNER_DISPLAY',
    });
    if (user.token) {
      setAuthToken(user.token);
    }

    axios
      .post(`/todo/completed-todo/${id}`)
      .then((data) => {
        getTasks();
      })
      .then((d) => {
        dispatch({
          type: 'STOP_SPINNER',
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelectHandler = (e) => {
    e.preventDefault();
    if (e.target.value === 'All') {
      setFilteredTask(task);
    } else {
      let newArray = task.filter((f) => f.frequency === e.target.value);
      setFilteredTask(newArray);
    }
  };

  const handleSearch = () => {
    return filteredTask.filter((f) => f.todo.includes(search));
  };

  return (
    <div>
      {task.length === 0 ? (
        <p>No tasks added!. Add some task from the Create Task Section</p>
      ) : (
        <div>
          <div className='label'>
            <form>
              <label>Search</label>
              <input
                type='text'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>

            <select onChange={(e) => onSelectHandler(e)}>
              <option defaultValue='All' value='All'>
                All
              </option>
              <option value='Daily'>Daily</option>
              <option value='Weekly'>Weekly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Yearly'>Yearly</option>
            </select>
          </div>

          {handleSearch().map((t) => (
            <Task
              data={t}
              key={t._id}
              deleteBtn={onDelete}
              edit={true}
              completeBtn={onComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Todo;

//The moon is bright shinning in a darkness.

//Can you hear the night.
