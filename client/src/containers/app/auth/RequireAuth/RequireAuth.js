import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authenticateUser, saveSidebarState } from 'actions/authActions';
import App from 'components/app';
import AppLoading from 'components/app/loading/AppLoading/AppLoading.js';

export class RequireAuth extends Component {
  componentDidMount = () => {
    const { authenticateUser, loggedinUser } = this.props;
    if (!loggedinUser) authenticateUser();
  };

  render = () => (
    <div className="app">
      {!this.props.loggedinUser ? (
        <AppLoading {...this.props} />
      ) : (
        <App {...this.props} />
      )}
    </div>
  );
}

export default connect(
  state => ({
    collapseSideNav: state.auth.collapseSideNav,
    loggedinUser: state.auth.loggedinUser,
    serverMessage: state.server.message,
  }),
  { authenticateUser, saveSidebarState },
)(RequireAuth);
