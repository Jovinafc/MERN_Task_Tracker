import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import axios from '../../axios';
import { useStateValue } from '../../StateProvider';
import Task from './Task';

const Complete = () => {
  const [{}, dispatch] = useStateValue();

  const getTasks = () => {
    axios
      .get('/todo/get-completed', {
        headers: {
          'x-auth-token': user.token,
        },
      })
      .then((data) => {
        setTask(data.data);
        setFilteredTask(data.data);
      })
      .catch((err) => {
        console.log(err);
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
    axios
      .delete(`/todo/remove-todo/${id}`, {
        headers: {
          'x-auth-token': user.token,
        },
      })
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
    axios
      .post(
        `/todo/uncompleted-todo/${id}`,
        {},
        {
          headers: {
            'x-auth-token': user.token,
          },
        }
      )
      .then((data) => {
        getTasks();
      })
      .then((d) => {
        dispatch({
          type: 'STOP_SPINNER',
        });
      })
      .catch((err) => {});
  };

  const handleSearch = () => {
    return filteredTask.filter((f) => f.todo.includes(search));
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

  const [user] = useOutletContext();
  const [task, setTask] = useState([]);
  const [filteredTask, setFilteredTask] = useState(task);
  const [search, setSearch] = useState('');
  return (
    <div>
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
                edit={false}
                deleteBtn={onDelete}
                uncompleteBtn={onComplete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Complete;
