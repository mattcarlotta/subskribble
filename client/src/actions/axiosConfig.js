import * as app from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

app.defaults.adapter = httpAdapter;

export default app.create({
  baseURL: 'http://localhost:5000/api/',
  withCredentials: true
})
