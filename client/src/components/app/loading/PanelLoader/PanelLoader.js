import React, { Component } from 'react';
import Spinner from '../Spinner/Spinner.js';
import NoDataToDisplay from '../../notfound/NoDataToDisplay/noDataToDisplay.js';

class PanelLoader extends Component {
  state = { requestTimeout: false };

  componentDidMount = () => {
    this.setTimer();
  };

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

export default PanelLoader;
