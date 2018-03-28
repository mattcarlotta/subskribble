import * as app from 'axios';
import { browserHistory } from 'react-router';

import {
	AUTH_ERROR,
	AUTH_SUCCESS,
	FETCHING_USER,
	RESET_NOTIFICATIONS,
	SET_SIGNEDIN_USER,
	UNAUTH_USER
} from '../actions/types';
import configAuth from './configAuth';
import dispatchError from './dispatchError';

//==========================================================================
// Authorization
//==========================================================================

// Displays error messages
const authError = error => {
	return {
		type: AUTH_ERROR,
		payload: error
	};
};

// Displays success messages
const authSuccess = message => {
	return {
		type: AUTH_SUCCESS,
		payload: message
	};
};

// Attempts to auth a previously signed in user
const authenticateUser = id => async dispatch => {
	try {
		const config = configAuth();

		if (!config.user) {
			dispatch(fetchingUser(false));
		} else {
			const { data } = await app.get(`/api/signedin`, config);

			dispatch({ type: SET_SIGNEDIN_USER, payload: data });
			dispatch({ type: FETCHING_USER, payload: false });
		}
	} catch (err) {
		dispatchError(dispatch, err);
		dispatch({ type: FETCHING_USER, payload: false });
		dispatch(signoutUser());
		throw err;
	}
};

// Allows AJAX time to fetch a user on refresh before loading app
const fetchingUser = bool => {
	return {
		type: FETCHING_USER,
		payload: bool
	};
};

// Resets auth notifications
const resetNotifications = () => {
	return {
		type: RESET_NOTIFICATIONS
	};
};

// Resets user password
const resetUserPassword = ({ password }) => async dispatch => {
	try {
		await app.post(`api/reset-password`, { password });
		browserHistory.push('/login');
	} catch (err) {
		dispatchError(dispatch, err);
	}
};

// Attempts to sign in user
const signinUser = ({ username, password }) => async dispatch => {
	try {
		const { data } = await app.post(`api/signin`, { username, password });
		localStorage.setItem('token', data.token);
		dispatch({ type: SET_SIGNEDIN_USER, payload: data });
		browserHistory.push('/');
	} catch (err) {
		const error = `Your username or password is incorrect!`;
		dispatchError(dispatch, error);
	}
};

// Atempts to sign up user
const signupUser = ({ email, username, password }) => async dispatch => {
	try {
		const { data } = await app.post(`api/signup`, {
			email,
			username,
			password
		});

		localStorage.setItem('token', data.token);
		dispatch({ type: SET_SIGNEDIN_USER, payload: data.user });
		browserHistory.push('/');
	} catch (err) {
		dispatchError(dispatch, err);
		console.error(err);
	}
};

// Signs user out
const signoutUser = () => {
	localStorage.removeItem('token');

	return {
		type: UNAUTH_USER
	};
};

export {
	authError,
	authSuccess,
	authenticateUser,
	fetchingUser,
	resetNotifications,
	resetUserPassword,
	signinUser,
	signupUser,
	signoutUser
}
