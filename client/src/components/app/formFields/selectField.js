import map from 'lodash/map';
import React, { PureComponent, Fragment } from 'react';
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

  /* eslint-disable */
  handleBlur = () => this._select.blur();
  /* eslint-enable */

  render = () => {
    const { OPTIONS, placeholder, sortByNum } = this.props;

    return (
      <Fragment>
        <span style={{ textTransform: 'none' }}>Items per page: </span>
        {/* eslint-disable */}
        <Select
          placeholder={placeholder}
          onSelect={this.handleSortDataBy}
          style={{ width: '100%', maxWidth: '68px' }}
          onChange={this.handleBlur}
          ref={node => (this._select = node)}
          value={sortByNum}
        >
          {/* eslint-enable */}
          {map(OPTIONS, value => (
            <Option key={value} value={value}>
              {value}
            </Option>
          ))}
        </Select>
      </Fragment>
    );
  };
}

SelectField.propTypes = {
  fetchAction: PropTypes.func.isRequired,
  setSortByNum: PropTypes.func.isRequired,
  selectCurrentPage: PropTypes.func.isRequired,
  OPTIONS: PropTypes.arrayOf(PropTypes.number),
  TAB: PropTypes.string,
  placeholder: PropTypes.string,
  sortByNum: PropTypes.number,
};
