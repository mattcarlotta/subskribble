import { app } from './axiosConfig';
import * as types from './types';
import { browserHistory } from 'react-router';
import { deleteAccountAvatar } from './avatarActions';

//==========================================================================
// Authorization
//==========================================================================

// attempts to auth user on refresh
const authenticateUser = () => dispatch => (
	app.get('loggedin')
	.then(({data}) => {
		data
			? dispatch({ type: types.SET_SIGNEDIN_USER, payload: data })
			: dispatch({ type: types.NO_SIGNEDIN_USER})
	})
	.catch(err => {
		dispatch({ type: types.NO_SIGNEDIN_USER });
	})
)

// attempts to delete the user's account
const deleteUserAccount = (formProps) => dispatch => {
	app.delete(`delete-account`, { data: { ...formProps }})
	.then(({ data: { message, token, userid }}) => {
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
		if(token && userid) dispatch(deleteAccountAvatar(token, userid))
		dispatch(logoutUser())
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
}

// sets app loading state to false
const doNotAuthUser = () => dispatch => {
	dispatch({ type: types.NO_SIGNEDIN_USER });
}

// removes current user from redux props and clears cookie
const logoutUser = () => dispatch => {
	app.post(`logout`)
	.then(() => {
		dispatch({ type: types.UNAUTH_USER })
		browserHistory.push('/subskribble')
	})
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
};

// returns error message if missing token
const missingVerificationToken = () => ({ type: types.USER_WAS_VERIFIED, payload: false });

const missingPasswordToken = () => ({
	type: types.SERVER_ERROR,
	payload: 'Missing password token! Please check your email and click on the "Create New Password" button.'
})

// updates a user'deleteUserAccounts password
const resetUserPassword = (password, token) => dispatch => (
	app.put(`reset-password/verify?token=${token}`, { email: 'helpdesk@subskribble.com', password })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// emails user a token to reset password
const resetUserToken = email => dispatch => (
	app.put(`reset-token`, { email, password: 'reset-token' })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// will save the state of the sidebar (collapsed or visible)
const saveSidebarState = collapseSideNav => dispatch => (
	app.put(`save-sidebar-state?collapseSideNav=${collapseSideNav}`)
	.then(({data: { collapseSideNav }}) => dispatch({ type: types.SET_NAVBAR_STATE, payload: collapseSideNav }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
)

// attempts to sign user in, then sets jwt token to cookie if successful
const signinUser = props => dispatch => (
	app.post(`signin`, { ...props })
	.then(({data}) => dispatch({ type: types.SET_SIGNEDIN_USER, payload: data }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// attempts to sign up a new user
const signupUser = props => dispatch => (
	app.post(`signup`, { ...props })
	.then(({data: {message}}) => dispatch({ type: types.SERVER_MESSAGE, payload: message }))
	.catch(err => dispatch({ type: types.SERVER_ERROR, payload: err }))
);

// attempts to update users account details
const updateUserAccount = formProps => dispatch => (
	app.put(`update-account`, { ...formProps })
	.then(({data: {message, user}}) => {
		!user
			? dispatch(logoutUser())
			: dispatch({ type: types.SET_SIGNEDIN_USER, payload: user })
		dispatch({ type: types.SERVER_MESSAGE, payload: message })
	})
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
	deleteUserAccount,
	doNotAuthUser,
	logoutUser,
	missingPasswordToken,
	missingVerificationToken,
	resetUserPassword,
	resetUserToken,
	saveSidebarState,
	signinUser,
	signupUser,
	updateUserAccount,
	verifyEmail
}
