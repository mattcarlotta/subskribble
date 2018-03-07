import * as app from 'axios';

// import dispatchError from './dispatchError';
// import dispatchSuccess from './dispatchSuccess';

// Fetches 10 subscribers from DB
export const fetchSubscribers = () => dispatch => (
	app.get(`/api/subscribers`)
	.catch(err => console.log(err))
)
