import app from './axiosConfig';
import * as types from './types';

const fetchUserDetails = userid => dispatch => (
	app.get(`/api/users/user?id=${userid}`)
	.then(({data}) => {
		console.log('data', data);
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

export default {
	fetchUserDetails
}
