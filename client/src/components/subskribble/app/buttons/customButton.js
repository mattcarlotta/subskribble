import React from 'react';
import { Button } from 'antd';

export default ({ className, label, onClickAction }) => (
  <div className={className}>
    <Button
      className="btn-primary"
      onClick={onClickAction}
    >
      {label}
    </Button>
  </div>
)
