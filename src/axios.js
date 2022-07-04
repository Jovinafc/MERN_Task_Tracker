import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:8080',
  baseURL: 'https://mern-todo14-app.herokuapp.com',
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;
