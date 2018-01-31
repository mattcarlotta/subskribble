import React from 'react';
import { Button } from 'antd';

export default function({ className, label, onClickAction }) {
  return (
    <div className={className}>
      <Button
        className="btn-primary"
        onClick={onClickAction}
      >
        {label}
      </Button>
    </div>
  )
}
