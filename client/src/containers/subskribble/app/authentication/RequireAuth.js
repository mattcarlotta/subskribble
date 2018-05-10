import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, doNotAuthUser } from '../../../../actions/authActions';
import { withCookies } from 'react-cookie';
import App from '../../../../components/subskribble';
import Spinner from '../loading/Spinner';
import Login from './Login';

class RequireAuth extends Component {
	componentDidMount = () => {
		const { cookies, loggedinUser} = this.props;
		const hasCookie = cookies.get('Authorization');
		if (!loggedinUser && hasCookie) this.props.authenticateUser(cookies)
		if (!loggedinUser && !hasCookie) this.props.doNotAuthUser()
	}

	render = () => (
		this.props.isLoading
			? <Spinner />
			: !this.props.loggedinUser
				?	<Login visible={true} {...this.props}/>
				:	<App {...this.props}/>
	)
}

export default connect(state => ({ loggedinUser: state.auth.loggedinUser, isLoading: state.app }), { authenticateUser, doNotAuthUser })(withCookies(RequireAuth));
