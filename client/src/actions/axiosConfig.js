import * as app from 'axios';
import httpAdapter from 'axios/lib/adapters/http';

app.defaults.adapter = httpAdapter;
app.interceptors.response.use(response => (response), error => (Promise.reject(error.response.data.err)))

export default app.create({
  baseURL: 'http://localhost:5000/api/'
})
