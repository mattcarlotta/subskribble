import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popconfirm, Tooltip } from 'antd';
import {
  materialIcons,
  tableStatusAction,
  tableTooltip,
} from './actionButton.scss';

const ActionButton = ({ button, buttonAction, className, title, popTitle }) => (
  <Popconfirm
    arrowPointAtCenter
    cancelText="No"
    title={popTitle}
    okText="Yes"
    onConfirm={buttonAction}
    overlayClassName={`${tableTooltip} table-action`}
  >
    <Tooltip arrowPointAtCenter placement="bottom" title={title}>
      <Button className={`${className} ${tableStatusAction}`}>
        <i className={materialIcons}>{button}</i>
      </Button>
    </Tooltip>
  </Popconfirm>
);

export default ActionButton;

ActionButton.propTypes = {
  button: PropTypes.string,
  buttonAction: PropTypes.func,
  className: PropTypes.string,
  title: PropTypes.string,
  popTitle: PropTypes.string,
};
