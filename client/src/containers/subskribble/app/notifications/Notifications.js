import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import actions from '../../../../actions/notificationActions';
import NotificationButton from '../../../../components/subskribble/app/notifications/NotificationButton';

class Notifications extends PureComponent {
  componentDidMount = () => this.props.fetchNotifications();
  render = () => ( <NotificationButton {...this.props} /> )
}

export default connect(state => ({ ...state.notes }), { ...actions })(Notifications)
