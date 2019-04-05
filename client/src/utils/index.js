import get from 'lodash/get';
import axios from 'axios';

export const app = axios.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true,
});
app.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response.data.err),
);

export const avatarAPI = axios.create({
  baseURL: 'http://localhost:4000/api/',
  withCredentials: true,
});
avatarAPI.interceptors.response.use(
  response => response,
  error => {
    const err = get(error, ['response', 'data', 'err']);

    return err ? Promise.reject(err) : Promise.reject(error.message);
  },
);

export const upperCase = str => str.replace(/^\w/, c => c.toUpperCase());
