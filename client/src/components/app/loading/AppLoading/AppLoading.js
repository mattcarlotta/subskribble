import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner.js';
import Login from '../../auth/Login/Login.js';

export default class AppLoading extends Component {
  state = { requestTimeout: false };

  componentDidMount = () => this.setTimer();

  componentDidUpdate = nextProps => {
    if (this.props.serverError !== nextProps.serverError) this.notAuthed();
  };

  componentWillUnmount = () => this.clearTimer();

  notAuthed = () =>
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
