import React, { Component } from 'react';
import Loading from '../../../../images/logos/loading-blocks.gif'
import NoDataToDisplay from '../notfound/noDataToDisplay';

export default class Loader extends Component {
  state = { requestTimeout: false };

	componentDidMount = () => this.setTimer();

	componentWillUnmount = () => this.clearTimer();

  clearTimer = () => clearTimeout(this.timeout)

  timer = () => this.setState({ requestTimeout: true }, () => this.clearTimer())

  setTimer = () => this.timeout = setTimeout(this.timer, 3000)

  render = () => {
    const { requestTimeout } = this.state;
		const { serverError } = this.props;

		if (serverError || requestTimeout) return <NoDataToDisplay {...this.props} />

    return (
      <div className="spinner-container">
        <img src={Loading} alt="loading-block.gif" height="128px" />
      </div>
    );
  }
}
