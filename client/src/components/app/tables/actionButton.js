import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Tooltip } from 'antd';

const ActionButton = ({ button, buttonAction, title, popTitle }) => (
  <Popconfirm
    arrowPointAtCenter
    cancelText="No"
    title={popTitle}
    okText="Yes"
    onConfirm={buttonAction}
    overlayClassName="table-tooltip"
  >
    <Tooltip arrowPointAtCenter placement="bottom" title={title}>
      <Button className="table-status-action">
        <i className="material-icons">{button}</i>
      </Button>
    </Tooltip>
  </Popconfirm>
);

export default ActionButton;

ActionButton.propTypes = {
  button: PropTypes.string,
  buttonAction: PropTypes.func,
  title: PropTypes.string,
  popTitle: PropTypes.string,
};
