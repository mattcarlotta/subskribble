import * as app from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
// import dispatchError from './dispatchError';
// import dispatchSuccess from './dispatchSuccess';

app.defaults.adapter = httpAdapter;

// Fetches 10 subscribers from DB
export const fetchSubscribers = () => ( app.get(`http://localhost:5000/api/subscribers`))
