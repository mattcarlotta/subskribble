import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

// import { resetServerError } from '../../../actions/appActions';

notification.config({
  placement: 'topRight',
  top: 50,
  duration: 3,
});

class RenderErrors extends PureComponent {
  componentDidUpdate = () => {
    const { serverError } = this.props;
    notification['error']({
      message: 'Server Error',
      description: serverError,
    });
  }

  render = () => (null)
}

export default connect(state => ({ serverError: state.server.error }))(RenderErrors);
