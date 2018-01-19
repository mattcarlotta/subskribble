import map from 'lodash/map';
import React from 'react';
import { Field } from 'redux-form';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Switch } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
export const { Option } = Select;

const CreateAntReduxField = Component => ({ children, input, meta: { invalid, touched, error }, label, ...rest }) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      help={hasError && error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

const AntSubmitButton = ({ label, pristine, submitting, style }) => (
  <Button
    className="btn btn-primary"
    disabled={pristine || submitting}
    htmlType="submit"
    style={{ ...style }}
  >
    { label }
  </Button>
)

export const AntFormSubmit = ({ label, pristine, submitting, style }) => (
  <FormItem>
    <AntSubmitButton
      label={label}
      pristine={pristine}
      submitting={submitting}
      style={style}
    />
  </FormItem>
)

export const AntFormButtons = ({ label, pristine, reset, submitting }) => (
  <FormItem>
    <AntSubmitButton
      label={label}
      pristine={pristine}
      submitting={submitting}
    />
    <Button
      disabled={pristine || submitting}
      onClick={reset}
    >
      Clear Values
    </Button>
  </FormItem>
)

export const AntFormFields = ({ FIELDS }) => {
  return map(FIELDS, ({ name, type, component, label, style, validateFields }, key) => (
    <Field
      key={key}
      name={name}
      type={type}
      component={component}
      placeholder={label}
      style={{ fontSize: 15, width: '100%', ...style }}
      validate={validateFields}
    />
  ))
}

export const AntCheckbox = CreateAntReduxField(Checkbox);
export const AntInput = CreateAntReduxField(Input);
export const AntMonthPicker = CreateAntReduxField(MonthPicker);
export const AntRadioGroup = CreateAntReduxField(RadioGroup);
export const AntRangePicker = CreateAntReduxField(RangePicker);
export const AntSelect = CreateAntReduxField(Select);
export const AntSwitch = CreateAntReduxField(Switch);
export const AntTextArea = CreateAntReduxField(TextArea);
export const AntWeekPicker = CreateAntReduxField(WeekPicker);
