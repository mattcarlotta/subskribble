import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Spinner from 'components/app/loading/Spinner/Spinner.js';
import NoDataToDisplay from 'components/app/notfound/NoDataToDisplay/noDataToDisplay.js';

class PanelLoading extends Component {
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

PanelLoading.propTypes = {
  activeitemcount: PropTypes.number,
  inactiveitemcount: PropTypes.number,
  itemcount: PropTypes.number,
  serverError: PropTypes.string,
};

export default PanelLoading;
