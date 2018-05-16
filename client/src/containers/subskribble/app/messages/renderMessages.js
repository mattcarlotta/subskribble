import map from 'lodash/map';
import { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

import { resetServerMessages } from '../../../../actions/appActions';

notification.config({
  placement: 'topRight',
  top: 50,
  duration: 8,
});

class RenderMessages extends Component {
  componentDidUpdate = () => {
    map([{ noteType: 'error', message: 'Error', description: this.props.serverError },
      { noteType: 'success', message: 'Update', description: this.props.serverMessage }], props => this.showNotification({...props}))
  }

  showNotification = ({ noteType, message, description }) => {
    const { resetServerMessages } = this.props;
    if (description) {
      notification[noteType]({ message, description });
      setTimeout(() => resetServerMessages(), 1000);
      ;
    }
  }

  shouldComponentUpdate = (nextProps) => (
    this.props.serverError !== '' || nextProps.serverError !== '' || this.props.serverMessage !== '' || nextProps.serverMessage !== ''
  )

  render = () => ( null )
}

export default connect(state => ({
  serverError: state.server.error,
  serverMessage: state.server.message
}), { resetServerMessages })(RenderMessages);
