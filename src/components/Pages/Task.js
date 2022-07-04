import axios from '../../axios';
import React from 'react';
import './Task.css';
import { useStateValue } from '../../StateProvider';
import { NavLink } from 'react-router-dom';

const Task = ({ data, edit, deleteBtn, completeBtn, uncompleteBtn }) => {
  const [{ user, modal_prompt, modal_type }, dispatch] = useStateValue();

  return (
    <div className='task'>
      <h3>{data.todo} </h3>
      <div>
        <p>{data.frequency}</p>
        {edit ? (
          <NavLink to={`/home/update/${data._id}`}>
            <button className='editBtn'>Edit</button>
          </NavLink>
        ) : null}
        {uncompleteBtn ? (
          <button
            className='compBtn'
            onClick={(e) => uncompleteBtn(e, data._id)}
          >
            Undo
          </button>
        ) : (
          <button className='compBtn' onClick={(e) => completeBtn(e, data._id)}>
            Complete
          </button>
        )}

        <button className='deleteBtn' onClick={(e) => deleteBtn(e, data._id)}>
          Delete
        </button>
      </div>
      <span className='freq'>{data.frequency}</span>
    </div>
  );
};

export default Task;
