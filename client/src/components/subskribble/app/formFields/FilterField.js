import debounce from 'lodash/debounce'
import React, { Component } from 'react';
// import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { AntInput } from '../../../../containers/forms/formfields/antReduxFormFields';
import { Button } from 'antd';

class FilterField extends Component {
  state = { filterField: '' }

  logInput = debounce(value => { this.setState({ filterField: value }) }, 300)

  resetField = () => this.setState({ filterField: '' });

  handleFormChange = event => this.logInput(event.target.value);

  render() {
    const { placeholder, reset } = this.props;
    return (
      <form className="filter-container" onChange={this.handleFormChange}>
        <div>
          <div className='form-95'>
            <Field
              name="filter"
              component={AntInput}
              placeholder={placeholder}
              ref="filter"
            />
          </div>
          <div className="form-05">
            {this.state.filterField.length > 0 &&
              <Button
                className="material-icons reset-field"
                onClick={() => {
                  reset();
                  this.resetField();
                }}
                >
                  remove-circle
              </Button>
            }
          </div>
        </div>
      </form>
    );
  }
}

export default FilterField = reduxForm({})(FilterField);
