import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Button, Divider, Popconfirm, Tooltip } from 'antd';
import {
  materialIcons,
  tableStatusAction,
  tableTooltip,
} from './actionButton.scss';

const ActionButton = ({ button, buttonAction, className, divider, title }) => (
  <Fragment>
    <Popconfirm
      arrowPointAtCenter
      cancelText="No"
      title={`Are you sure you want to ${title} this item?`}
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
    {divider && <Divider type="vertical" />}
  </Fragment>
);

export default ActionButton;

ActionButton.propTypes = {
  button: PropTypes.string,
  buttonAction: PropTypes.func,
  className: PropTypes.string,
  divider: PropTypes.bool,
  title: PropTypes.string,
};
