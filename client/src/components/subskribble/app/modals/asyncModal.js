import React from 'react';
import { Modal } from 'antd';

export default (props) => {
  const { confirmLoading, FORM, onOk } = props;
  return (
    <Modal {...props}>
      <FORM confirmLoading={confirmLoading} onFormSubmit={onOk}  />
    </Modal>
  )
}
