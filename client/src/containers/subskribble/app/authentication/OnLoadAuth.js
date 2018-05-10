import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, doNotAuthUser } from '../../../../actions/authActions';
import { withCookies } from 'react-cookie';
import App from '../../../../components/subskribble';
import Spinner from '../loading/Spinner';
import Login from './LoginButton';

class OnLoadAuth extends Component {
	componentDidMount = () => {
		const { cookies } = this.props;
		(cookies.get('Authorization'))
			? this.props.authenticateUser(this.props.cookies)
			: this.props.doNotAuthUser()
	}

	render = () => {
		if (this.props.isLoading) return <Spinner />

		return (
			!this.props.loggedinUser
				?	<Login visible={true} {...this.props}/>
				:	<App {...this.props}/>
		)
	}
}

export default connect(state => ({ loggedinUser: state.auth.loggedinUser, isLoading: state.app }), { authenticateUser, doNotAuthUser })(withCookies(OnLoadAuth));
