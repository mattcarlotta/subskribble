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
      <Component {...input} {...rest} children={children}  />
    </FormItem>
  );
};


const AntSubmitButton = ({ label, onClick, pristine, submitting, style, type }) => (
  <Button
    className="btn btn-primary"
    disabled={pristine || submitting}
    htmlType={type}
    onClick={onClick}
    style={{ ...style }}
  >
    { label }
  </Button>
)

export const AntFormSubmit = ({ label, pristine, submitting, style, type }) => (
  <FormItem>
    <AntSubmitButton
      label={label}
      pristine={pristine}
      submitting={submitting}
      style={style}
      type="submit"
    />
  </FormItem>
)

export const AntFormButtons = ({ label, pristine, reset, submitting }) => (
  <FormItem>
    <AntSubmitButton
      label={label}
      pristine={pristine}
      submitting={submitting}
      type="submit"
    />
    <Button
      disabled={pristine || submitting}
      onClick={reset}
    >
      Clear Values
    </Button>
  </FormItem>
)

export const AntStepFormButtons = ({ backStyle, backLabel, onClickBack, pristine, submitLabel, submitStyle, submitting }) => (
  <FormItem>
    <AntSubmitButton
      label={backLabel}
      onClick={onClickBack}
      style={backStyle}
    />
    <AntSubmitButton
      label={submitLabel}
      pristine={pristine}
      style={submitStyle}
      submitting={submitting}
      type="submit"
    />
  </FormItem>
)

export const AntFormFields = ({ FIELDS }) => {
  return map(FIELDS, ({ className, component, name, label, normalize, onChange, selectOptions, style, type, validateFields }, key) => (
    <div key={key} className={className}>
      <Field
        name={name}
        component={component}
        normalize={normalize}
        onChange={onChange}
        placeholder={label}
        style={{ fontSize: 15, ...style }}
        type={type}
        validate={validateFields}
      >
        {selectOptions && map(selectOptions, value => (
          <Option key={value} value={value}>{value}</Option>
        ))}
      </Field>
    </div>
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
