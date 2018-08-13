import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, saveSidebarState } from '../../../../actions/authActions';
import App from '../../../../components/subskribble/app';
import Login from '../../../../components/subskribble/app/auth/Login';

class RequireAuth extends Component {
	componentDidMount = () => {
		const { authenticateUser, loggedinUser} = this.props;
		if (!loggedinUser) authenticateUser();
	}

	render = () => (
		!this.props.loggedinUser
			? <Login {...this.props}/>
			: <App {...this.props}/>
	)
}

export default connect(state => ({
	collapseSideNav: state.auth.collapseSideNav,
	loggedinUser: state.auth.loggedinUser,
	serverMessage: state.server.message
}), { authenticateUser, saveSidebarState })(RequireAuth);
