import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, doNotAuthUser } from '../../../../actions/authActions';
import { withCookies } from 'react-cookie';
import App from '../../../../components/subskribble';
import Spinner from '../loading/Spinner';
import Login from './Login';

class RequireAuth extends Component {
	componentDidMount = () => {
		const { authenticateUser, cookies, doNotAuthUser, loggedinUser} = this.props;
		const hasCookie = cookies.get('Authorization');
		if (!loggedinUser) hasCookie ? authenticateUser(cookies) : doNotAuthUser()
	}

	render = () => (
		this.props.isLoading
			? <Spinner />
			: !this.props.loggedinUser
				?	<Login {...this.props}/>
				:	<App {...this.props}/>
	)
}

export default connect(state => ({
	loggedinUser: state.auth.loggedinUser,
	isLoading: state.app.isLoading
}), { authenticateUser, doNotAuthUser })(withCookies(RequireAuth));
