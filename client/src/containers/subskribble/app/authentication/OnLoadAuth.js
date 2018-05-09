import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { authenticateUser } from '../../../../actions/authActions';
import { withCookies } from 'react-cookie';
import App from '../../../../components/subskribble';
import Spinner from '../loading/Spinner';
import Login from './LoginButton';

class OnLoadAuth extends PureComponent {
	componentDidMount = () => {
		this.props.authenticateUser(this.props.cookies);
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

export default connect(state => ({ loggedinUser: state.auth.loggedinUser, isLoading: state.app }), { authenticateUser })(withCookies(OnLoadAuth));
