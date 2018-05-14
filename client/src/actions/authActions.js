import app from './axiosConfig';
import * as types from '../actions/types';

//==========================================================================
// Authorization
//==========================================================================

// attempts to auth user on refresh
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

// sets app loading state to false
const doNotAuthUser = () => ({ type: types.APP_LOADING_STATE });

// removes current user from redux props
const logoutUser = () => ({ type: types.UNAUTH_USER });

// returns error message if missing token
const missingToken = () => ({ type: types.USER_WAS_VERIFIED, payload: false });

// emails user a token to reset password
const resetUserPassword = props => dispatch => (
	app.put(`reset-password`, { ...props })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// attempts to sign user in, then sets jwt token to cookie if successful
const signinUser = (props, cookies) => dispatch => (
  app.post(`signin`, { ...props })
  .then(({data}) => {
		cookies.set('Authorization', data.token, { path: '/', maxAge: 2592000 });
		dispatch({ type: types.SET_SIGNEDIN_USER, payload: data })

	})
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// attempts to sign up a new user
const signupUser = props => dispatch => (
  app.post(`signup`, { ...props })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
  .catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// attempts to verify user's email via token
const verifyEmail = token => dispatch => (
	app.put(`email/verify?token=${token}`)
	.then(({data: {email}}) => dispatch({ type: types.USER_WAS_VERIFIED, payload: email }))
	.catch(err => {
		dispatch({ type: types.USER_WAS_VERIFIED, payload: false })
		dispatch({ type: types.SERVER_ERROR, payload: err })
	})
)

export {
	authenticateUser,
	doNotAuthUser,
	logoutUser,
	missingToken,
  resetUserPassword,
  signinUser,
  signupUser,
	verifyEmail
}
