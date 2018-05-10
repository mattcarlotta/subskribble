import app from './axiosConfig';
import * as types from '../actions/types';

//==========================================================================
// Authorization
//==========================================================================

const authenticateUser = () => dispatch => (
	app.get('loggedin')
	.then(({data}) => {
		dispatch({ type: types.APP_LOADING_STATE })
		dispatch({ type: types.SET_SIGNEDIN_USER, payload: data })
	})
	.catch(err => {
		dispatch({ type: types.APP_LOADING_STATE })
		dispatch({ type: types.SERVER_ERROR, payload: err })
	})
)

const doNotAuthUser = () => ({ type: types.APP_LOADING_STATE });

const logoutUser = cookies => {
	cookies.remove('Authorization')
	return { type: types.UNAUTH_USER }
}

const resetUserPassword = props => dispatch => (
	app.put(`reset-password`, { ...props })
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

const signinUser = (props, cookies) => dispatch => (
  app.post(`signin`, { ...props })
  .then(({data}) => {
		cookies.set('Authorization', data.token, {maxAge: 2592000 });
		dispatch({ type: types.SET_SIGNEDIN_USER, payload: data })

	})
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

const signupUser = props => dispatch => (
  app.post(`signup`, { ...props })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

export {
	authenticateUser,
	doNotAuthUser,
	logoutUser,
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
