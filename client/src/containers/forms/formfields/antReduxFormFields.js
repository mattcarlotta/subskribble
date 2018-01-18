import React from 'react';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Switch } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

const CreateAntReduxField = Component => ({ children, input, meta: { invalid, touched, error }, label, ...rest }) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      // {...formItemLayout}
      label={label}
      validateStatus={hasError ? 'error' : 'success'}
      help={hasError && error}
    >
      <Component {...input} {...rest} children={children} />
    </FormItem>
  );
};

export const { Option } = Select;

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

export const AntCheckbox = CreateAntReduxField(Checkbox);
export const AntInput = CreateAntReduxField(Input);
export const AntMonthPicker = CreateAntReduxField(MonthPicker);
export const AntRadioGroup = CreateAntReduxField(RadioGroup);
export const AntRangePicker = CreateAntReduxField(RangePicker);
export const AntSelect = CreateAntReduxField(Select);
export const AntSwitch = CreateAntReduxField(Switch);
export const AntTextArea = CreateAntReduxField(TextArea);
export const AntWeekPicker = CreateAntReduxField(WeekPicker);
