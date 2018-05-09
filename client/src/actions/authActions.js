import app from './axiosConfig';
import * as types from '../actions/types';

//==========================================================================
// Authorization
//==========================================================================

// Displays error messages
// const authError = error => {
// 	return {
// 		type: AUTH_ERROR,
// 		payload: error
// 	};
// };

// Displays success messages
// const authSuccess = message => {
// 	return {
// 		type: AUTH_SUCCESS,
// 		payload: message
// 	};
// };

// Attempts to auth a previously signed in user
// const authenticateUser = id => async dispatch => {
// 	try {
// 		const config = configAuth();
//
// 		if (!config.user) {
// 			dispatch(fetchingUser(false));
// 		} else {
// 			const { data } = await app.get(`/api/signedin`, config);
//
// 			dispatch({ type: SET_SIGNEDIN_USER, payload: data });
// 			dispatch({ type: FETCHING_USER, payload: false });
// 		}
// 	} catch (err) {
// 		dispatchError(dispatch, err);
// 		dispatch({ type: FETCHING_USER, payload: false });
// 		dispatch(signoutUser());
// 		throw err;
// 	}
// };

// Allows AJAX time to fetch a user on refresh before loading app
// const fetchingUser = bool => {
// 	return {
// 		type: FETCHING_USER,
// 		payload: bool
// 	};
// };

// Resets user password
// const resetUserPassword = ({ password }) => async dispatch => {
// 	try {
// 		await app.post(`api/reset-password`, { password });
// 		browserHistory.push('/login');
// 	} catch (err) {
// 		dispatchError(dispatch, err);
// 	}
// };

// Attempts to sign in user
// const signinUser = ({ username, password }) => async dispatch => {
// 	try {
// 		const { data } = await app.post(`api/signin`, { username, password });
// 		dispatch({ type: SET_SIGNEDIN_USER, payload: data });
// 	} catch (err) {
// 		dispatchError(dispatch, error);
// 	}
// };

// Atempts to sign up user
// const signupUser = ({ email, username, password }) => async dispatch => {
// 	try {
// 		const { data } = await app.post(`api/signup`, {
// 			email,
// 			username,
// 			password
// 		});
//
// 		localStorage.setItem('token', data.token);
// 		dispatch({ type: SET_SIGNEDIN_USER, payload: data.user });
// 		browserHistory.push('/');
// 	} catch (err) {
// 		dispatchError(dispatch, err);
// 		console.error(err);
// 	}
// };
//
// // Signs user out
// const signoutUser = () => {
// 	localStorage.removeItem('token');
//
// 	return {
// 		type: UNAUTH_USER
// 	};
// };
const authenticateUser = () => dispatch => (
	app.get('loggedin', {withCredentials: true})
	.then(({data}) => {
		dispatch({ type: types.APP_LOADING_STATE })
		dispatch({ type: types.SET_SIGNEDIN_USER, payload: data })
	})
	.catch(err => {
		dispatch({ type: types.APP_LOADING_STATE, payload: false })
		dispatch({ type: types.SERVER_ERROR, payload: err })
	})
)

const resetUserPassword = props => dispatch => (
	app.put(`reset-password`, { ...props })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

const signinUser = props => dispatch => (
  app.post(`signin`, { ...props })
  .then(({data}) => dispatch({ type: types.SET_SIGNEDIN_USER, payload: data }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

const signupUser = props => dispatch => (
  app.post(`signup`, { ...props })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

export {
	authenticateUser,
  resetUserPassword,
  signinUser,
  signupUser
}

// export default {
//   // attempts to reset user password
//   resetUserPassword: ({ password }) => async dispatch => (
// 		await app.post(`api/reset-password`, { password })
//     .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
//   ),
// 	// attempts to sign in a user
//   signinUser: props => dispatch => (
//     app.post(`api/signin`, { ...props })
//     .then(data => dispatch({ type: types.SET_SIGNEDIN_USER, payload: data }))
//     .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
//   ),
//   // attempts to create a new user
//   signupUser: props => async dispatch => (
//     await app.post(`api/signup`, { ...props })
//     .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
//   ),
// }

// export {
// 	authError,
// 	authSuccess,
// 	authenticateUser,
// 	fetchingUser,
// 	resetNotifications,
// 	resetUserPassword,
// 	signinUser,
// 	signupUser,
// 	signoutUser
// }
