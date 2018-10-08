import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from '../../../components/app/loading/Spinner';
import NoDataToDisplay from '../../../components/app/notfound/noDataToDisplay';

class Loader extends Component {
  state = { requestTimeout: false };

  componentDidMount = () => this.setTimer();

  componentDidUpdate = nextProps => {
    const {
      activeitemcount,
      inactiveitemcount,
      itemcount,
      serverError,
    } = this.props;
    const { requestTimeout } = this.state;

    if (
      serverError !== nextProps.serverError ||
      (activeitemcount === 0 && inactiveitemcount === 0 && !requestTimeout) ||
      (itemcount === 0 && !requestTimeout)
    )
      this.noDataWasFound();
  };

  componentWillUnmount = () => this.clearTimer();

  noDataWasFound = () =>
    this.setState({ requestTimeout: true }, () => this.clearTimer());

  clearTimer = () => clearTimeout(this.timeout);

  timer = () =>
    this.setState({ requestTimeout: true }, () => this.clearTimer());

  setTimer = () => (this.timeout = setTimeout(this.timer, 3000));

  render = () =>
    this.state.requestTimeout ? (
      <NoDataToDisplay {...this.props} />
    ) : (
      <Spinner />
    );
}

export default connect(state => ({ serverError: state.server.error }))(Loader);
