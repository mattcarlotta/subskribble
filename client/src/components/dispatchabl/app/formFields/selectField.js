import map from 'lodash/map';
import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

export default class selectField extends Component {
  state = { value: 0 };

  handleChange = (event, index, value) => this.setState({value});

  render() {
    const { className, floatingLabelText, MENUITEMS } = this.props;
    return (
      <div className={className}>
        <SelectField
          floatingLabelText={floatingLabelText}
          value={this.state.value}
          onChange={this.handleChange}
          style={{ width: '100%', maxWidth: '200px' }}
          dropDownMenuProps={{anchorOrigin: {vertical:"center",horizontal:"left"}}}
          >
            {map(MENUITEMS, (primaryText, key) => {
                return <MenuItem key={key} value={key} primaryText={primaryText} />
            })}
          </SelectField>
      </div>
    );
  }
}
