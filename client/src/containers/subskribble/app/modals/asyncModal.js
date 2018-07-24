import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

class AsyncModal extends Component {
  state = { confirmLoading: false };

  componentDidUpdate = (prevProps, prevState) => {
    const { serverError, serverMessage } = this.props;
    serverError !== prevProps.serverError && serverError !== undefined && this.resetLoadingButton();
    serverMessage !== prevProps.serverMessage && serverMessage !== undefined && this.resetForm();
  }

  resetForm = () => {
    this.resetLoadingButton()
    this.props.resetSelectedForm()
  }

  resetLoadingButton = () => this.setState({ confirmLoading: false })

  showLoadingButton = () => this.setState({ confirmLoading: !this.state.confirmLoading })

  render = () => {
    const { FORM } = this.props;

    return (
      <Modal
        {...this.props}
        destroyOnClose={true}
        footer={null}
        style={{ top: 100 }}
      >
        <FORM confirmLoading={this.state.confirmLoading} showLoadingButton={this.showLoadingButton} {...this.props} />
      </Modal>
    )
  }
}

export default connect(state => ({ serverError: state.server.error }))(AsyncModal);
