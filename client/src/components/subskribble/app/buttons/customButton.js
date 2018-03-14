import React from 'react';
import { Button } from 'antd';

export default ({ className, label, onClickAction }) => (
  <Button
    className={`btn-primary ${className}`}
    onClick={onClickAction}
  >
    {label}
  </Button>
)
