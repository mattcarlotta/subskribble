import React from 'react';
import { Modal } from 'antd';

export default (props) => {
  const { confirmLoading, FORM, onOk } = props;
  return (
    <Modal style={{ top: 50 }} {...props}>
      <FORM confirmLoading={confirmLoading} onFormSubmit={onOk}  />
    </Modal>
  )
}
