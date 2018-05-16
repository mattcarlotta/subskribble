import React, { Component } from 'react';
import { connect } from 'react-redux';
import Spinner from './Spinner';
import NoDataToDisplay from '../../../../components/subskribble/app/notfound/noDataToDisplay';

class Loader extends Component {
  state = { requestTimeout: false };

	componentDidMount = () => this.setTimer();

  shouldComponentUpdate = nextProps => (nextProps.serverError !== '')

	componentWillUnmount = () => this.clearTimer();

  clearTimer = () => clearTimeout(this.timeout)

  timer = () => this.setState({ requestTimeout: true }, () => this.clearTimer())

  setTimer = () => this.timeout = setTimeout(this.timer, 3000)

  render = () => (
		(this.props.serverError || this.state.requestTimeout)
      ? <NoDataToDisplay {...this.props} />
      : <Spinner />
  )
}

export default connect(state => ({ serverError: state.server.error }))(Loader);
