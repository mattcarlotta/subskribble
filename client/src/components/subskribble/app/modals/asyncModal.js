import React from 'react';
import { Modal } from 'antd';

export default ({ confirmLoading, FORM, showLoadingButton, ...props }) => (
  <Modal
    {...props}
    destroyOnClose={true}
    footer={null}
    style={{ top: 150 }}
  >
    <FORM confirmLoading={confirmLoading} showLoadingButton={showLoadingButton} {...props} />
  </Modal>
)
