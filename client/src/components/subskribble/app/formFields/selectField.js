import map from 'lodash/map';
import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const SelectField = ({ className, OPTIONS, placeholder }) => {
  const handleChange = value => console.log(value);
  return (
    <div className={className}>
      <Select
        placeholder={placeholder}
        onSelect={handleChange}
        style={{ width: '100%', maxWidth: '150px' }}
        >
          {map(OPTIONS, value => (
            <Option key={value} value={value}>{value}</Option>
          ))}
        </Select>
    </div>
  );
}

export default SelectField;
