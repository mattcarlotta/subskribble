import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../../../actions/authActions';
import App from '../../../../components/subskribble/app';
import Spinner from '../loading/Spinner';
import Login from './Login';

class RequireAuth extends Component {
	componentDidMount = () => {
		const { authenticateUser, loggedinUser} = this.props;
		if (!loggedinUser) authenticateUser();
	}

	render = () => (
		(this.props.isLoading || this.props.loggedinUser === undefined)
			? <Spinner />
			: !this.props.loggedinUser
				?	<Login {...this.props}/>
				:	<App {...this.props}/>
	)
}

export default connect(state => ({
	loggedinUser: state.auth.loggedinUser,
	isLoading: state.app.isLoading
}), { authenticateUser })(RequireAuth);
