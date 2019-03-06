import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

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
  error => Promise.reject(error.response.data.err),
);

export const upperCase = str => str.replace(/^\w/, c => c.toUpperCase());

export const mockAppAxios = new MockAdapter(app);

export const mockAPIAxios = new MockAdapter(avatarAPI);
