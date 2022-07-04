import Auth from './components/Auth/Auth';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home/Home';
import { PrivateRoute } from './components/PrivateRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import { useStateValue } from './StateProvider';
import { useEffect } from 'react';
import Create from './components/Pages/Create';
import Complete from './components/Pages/Complete';
import Todo from './components/Pages/Todo';
import Modal from './components/Modal/Modal';
import axios from './axios';
function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch({
        type: 'LOAD_USER',
      });
    }
  }, []);

  return (
    <div className='App'>
      <Modal />
      <Routes>
        <Route path='/' element={<Auth />}>
          <Route path='register' element={<Register />} />
          <Route path='' element={<Login />} />
        </Route>

        <Route
          path='/home'
          exact
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path='pending' element={<Todo />} />
          <Route path='create' exact element={<Create />} />
          <Route path='complete' exact element={<Complete />} />
          <Route path='update/:id' exact element={<Create />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
