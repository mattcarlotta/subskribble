import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from '../../../../images/logos/loading-blocks.gif'

class LoginLoader extends Component {
  state = { requestTimeout: false };

	componentDidMount = () => this.setTimer();

  shouldComponentUpdate = nextProps => (nextProps.serverError !== '')

	componentWillUnmount = () => this.clearTimer();

  clearTimer = () => clearTimeout(this.timeout)

  timer = () => this.setState({ requestTimeout: true }, () => this.clearTimer())

  setTimer = () => this.timeout = setTimeout(this.timer, 3000)

  render = () => (
		(this.props.serverError || this.state.requestTimeout)
      ? null
      : <div className="spinner-container">
          <img src={Loading} alt="loading-block.gif" height="128px" />
        </div>
  )
}

export default connect(state => ({ serverError: state.server.error }))(LoginLoader);
