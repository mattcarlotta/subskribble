import React from 'react';
import { Input } from 'antd';

export const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

export default EditableCell;
