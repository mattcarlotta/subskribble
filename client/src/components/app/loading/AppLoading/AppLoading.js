import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner';
import Login from '../../auth/Login/Login';

export default class AppLoading extends Component {
  state = { requestTimeout: false };

  componentDidMount = () => this.setTimer();

  componentDidUpdate = nextProps =>
    this.props.serverError !== nextProps.serverError && this.noDataWasFound();

  componentWillUnmount = () => this.clearTimer();

  noDataWasFound = () =>
    this.setState({ requestTimeout: true }, () => this.clearTimer());

  clearTimer = () => clearTimeout(this.timeout);

  timer = () =>
    this.setState({ requestTimeout: true }, () => this.clearTimer());

  setTimer = () => (this.timeout = setTimeout(this.timer, 1000));

  render = () =>
    this.state.requestTimeout && !this.props.loggedinUser ? (
      <Login {...this.props} />
    ) : (
      <Spinner />
    );
}
