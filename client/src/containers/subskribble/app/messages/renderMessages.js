import { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

import { resetServerMessages } from '../../../../actions/appActions';

notification.config({
  placement: 'topRight',
  top: 50,
  duration: 4,
});

class RenderMessages extends Component {
  componentDidUpdate = () => {
    const { resetServerMessages, serverError, serverMessage } = this.props;
    if (serverError) {
      notification['error']({
        message: 'Error',
        description: serverError,
      });
      resetServerMessages();
    }

    if (serverMessage) {
      notification['success']({
        message: 'Message',
        description: serverMessage,
      });
      resetServerMessages();
    }
  }

  shouldComponentUpdate = (nextProps) => (
    this.props.serverError !== '' || nextProps.serverError !== '' || this.props.serverMessage !== '' || nextProps.serverMessage !== ''
  )

  render = () => ( null )
}

export default connect(state => ({ serverError: state.server.error, serverMessage: state.server.message }), { resetServerMessages })(RenderMessages);
