import map from 'lodash/map';
import React from 'react';
import { connect } from 'react-redux';
import { Select } from 'antd';
import { fetchNextActiveSubscribers, setSortByNum } from '../../../actions/tableActions';
const { Option } = Select;

const SelectField = ({ className, fetchNextActiveSubscribers, OPTIONS, placeholder, setSortByNum, TAB }) => {
  const handleSortDataBy = num => {
    setSortByNum(num);
    TAB = TAB.toLowerCase().replace(/\s/g, '')
    const limitCount = 0;
    const nextRecords = num;
    fetchNextActiveSubscribers(TAB, limitCount, nextRecords);
  };

  return (
    <div className={className}>
      <Select
        placeholder={placeholder}
        onSelect={handleSortDataBy}
        style={{ width: '100%', maxWidth: '150px' }}
        >
          {map(OPTIONS, value => (
            <Option key={value} value={value}>{value}</Option>
          ))}
      </Select>
    </div>
  )
}

export default connect(null, { fetchNextActiveSubscribers, setSortByNum })(SelectField);
