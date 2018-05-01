import React, { Component } from 'react';
import { Avatar, Tooltip } from 'antd';
import AsyncModal from '../../../../components/subskribble/app/modals/asyncModal';
import LoginForm from '../../forms/loginForm';

export default class LoginButton extends Component {
  state = { visible: false, confirmLoading: false }

  showModal = () => this.setState({ visible: true });

  handleOk = (values) => {
    console.log('values', values);
    this.setState({ confirmLoading: true });
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 3000);
  }

  handleCancel = () => this.setState({ visible: false, confirmLoading: false });

	render = () => (
    <div className="settings-tab">
			<Tooltip
				arrowPointAtCenter
				placement="bottom"
				title="Log In"
				overlayClassName="tooltip-placement"
        overlayStyle={{ display: this.state.visible ? 'none' : '' }}
      >
				<Avatar onClick={this.showModal} className="settings-icon signed-out" size="small" icon="user" />
        <AsyncModal
          {...this.state}
          destroyOnClose={true}
          footer={null}
          FORM={LoginForm}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="Log In"
          title="Log In"
          // width="90%"
        />
			</Tooltip>
		</div>
	);
}
