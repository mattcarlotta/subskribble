import map from 'lodash/map';
import React, { Component, Fragment } from 'react';
import AsyncModal from '../modals/asyncModal';
import CustomButton from '../../app/buttons/customButton';

class RenderPanelButtons extends Component {
  state = { visible: false, confirmLoading: false }

  showModal = () => this.setState({ visible: true });

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
  }

  handleCancel = () => this.setState({ visible: false, confirmLoading: false });

  render = () => {
    const { CUSTOMBUTTONS, FORM, FORMTITLE, SUBMITFORMTITLE } = this.props;
    const { confirmLoading, visible } = this.state;

    return (
      <Fragment>
        <AsyncModal
          bodyStyle={{ backgroundColor: '#F9F9FB' }}
          confirmLoading={confirmLoading}
          destroyOnClose={true}
          footer={null}
          FORM={FORM}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={SUBMITFORMTITLE}
          title={FORMTITLE}
          visible={visible}
          width="90%"
        />
        {map(CUSTOMBUTTONS, ({ className, label }, key) => (
          <CustomButton
            key={key}
            className={className}
            label={label}
            onClickAction={this.showModal}
          />
        ))}
      </Fragment>
    )
  }
}

export default RenderPanelButtons;
