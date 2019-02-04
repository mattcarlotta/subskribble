import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions/notificationActions.js';
import NotificationButton from '../../../components/app/notifications/NotificationButton/NotificationButton.js';

class Notifications extends PureComponent {
  componentDidMount = () => this.props.fetchNotifications();

  render = () => <NotificationButton {...this.props} />;
}

export default connect(
  state => ({ ...state.notes }),
  { ...actions },
)(Notifications);
