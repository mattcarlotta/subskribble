import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';

export default WrappedComponent => {
  class ButtonLoading extends Component {
    state = { confirmLoading: false };

    componentDidUpdate = prevProps => {
      const { serverError } = this.props;
      if (serverError !== prevProps.serverError && serverError !== undefined)
        this.resetButtonLoading();
    };

    showButtonLoading = () => this.setState({ confirmLoading: true });

    resetButtonLoading = () => this.setState({ confirmLoading: false });

    goBackPage = () => browserHistory.goBack();

    render = () => (
      <WrappedComponent
        {...this.state}
        {...this.props}
        handleGoBack={this.goBackPage}
        resetButtonLoading={this.resetButtonLoading}
        showButtonLoading={this.showButtonLoading}
      />
    );
  }
  return connect(state => ({ serverError: state.server.error }))(ButtonLoading);
};
