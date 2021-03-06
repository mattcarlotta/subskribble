import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { notification } from 'antd';
import { resetServerMessages } from 'actions/appActions.js';
import styles from './renderMessages.scss';

notification.config({ placement: 'topRight', top: 50, duration: 7 });

const descriptionLayout = noteType => (
  <div className={`${styles.iconMessageContainer} ${styles[noteType]}`}>
    <div className={styles.icon}>
      <i className={`${styles.materialIcons}`}>
        {noteType === 'error' ? 'error' : 'check'}
      </i>
    </div>
  </div>
);
const serverErrorMessage = description => [{ noteType: 'error', description }];
const serverSuccessMessage = description => [
  { noteType: 'success', description },
];

class RenderMessages extends Component {
  shouldComponentUpdate = nextProps =>
    this.props.serverError !== '' ||
    nextProps.serverError !== '' ||
    this.props.serverMessage !== '' ||
    nextProps.serverMessage !== '';

  componentDidUpdate = () => {
    const { serverError, serverMessage } = this.props;
    if (serverError || serverMessage) {
      const notification = serverError
        ? serverErrorMessage(serverError)
        : serverSuccessMessage(serverMessage);
      this.renderNotification(...notification);
    }
  };

  renderNotification = ({ noteType, description }) => {
    notification[noteType]({
      message: noteType === 'error' ? 'Error' : 'Update',
      description,
      icon: descriptionLayout(noteType),
    });
    setTimeout(() => this.props.resetServerMessages(), 3000);
  };

  render = () => null;
}

export default connect(
  state => ({
    serverError: state.server.error,
    serverMessage: state.server.message,
  }),
  { resetServerMessages },
)(RenderMessages);

RenderMessages.propTypes = {
  resetServerMessages: PropTypes.func.isRequired,
  serverError: PropTypes.string,
  serverMessage: PropTypes.string,
};
