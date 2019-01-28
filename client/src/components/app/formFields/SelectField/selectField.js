import map from 'lodash/map';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

export default class SelectField extends PureComponent {
  handleSortDataBy = nextRecords => {
    const { fetchAction, TAB, setSortByNum, selectCurrentPage } = this.props;
    setSortByNum(nextRecords);
    selectCurrentPage(1);
    fetchAction(TAB, 0, nextRecords);
  };

  render = () => {
    const { OPTIONS, sortByNum } = this.props;
    return (
      <div className="selectField">
        <span style={{ textTransform: 'none' }}>Items per page: </span>
        <Select
          onSelect={this.handleSortDataBy}
          style={{ width: '100%', maxWidth: '68px' }}
          value={sortByNum}
        >
          {map(OPTIONS, value => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </div>
    );
  };
}

SelectField.propTypes = {
  fetchAction: PropTypes.func.isRequired,
  setSortByNum: PropTypes.func.isRequired,
  selectCurrentPage: PropTypes.func.isRequired,
  OPTIONS: PropTypes.arrayOf(PropTypes.number),
  TAB: PropTypes.string,
  sortByNum: PropTypes.number,
};
