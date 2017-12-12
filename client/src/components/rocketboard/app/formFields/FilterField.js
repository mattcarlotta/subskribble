import debounce from 'lodash/debounce'
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import IconButton from 'material-ui/IconButton';
import Clear from 'material-ui/svg-icons/content/clear';

class FilterField extends Component {
  constructor() {
    super();
    this.logInput = debounce(this.logInput, 300);
  }

  logInput = value => console.log(value);

  handleFormChange = event => {
    this.logInput(event.target.value);
  }

  render() {
    const { className, floatingLabelText, reset } = this.props;
    return (
      <form className={className} onChange={this.handleFormChange}>
        <div className="filter-container">
          <div className='form-95'>
            <Field
              name="filter"
              component={TextField}
              floatingLabelText={floatingLabelText}
              ref="filter"
              withRef
              style={{ width: '100%' }}
            />
          </div>
          <div className="form-05">
            <IconButton
              iconStyle={{ width: 15, height: 15, color: '#0585bf' }}
              style={{ width: 40, height: 40 }}
              onClick={reset}
              tooltip="Clear Filter"
              >
                <Clear />
            </IconButton>
          </div>
        </div>
      </form>
    );
  }
}

export default FilterField = reduxForm({})(FilterField);
