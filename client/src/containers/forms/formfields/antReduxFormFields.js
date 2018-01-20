import map from 'lodash/map';
import React from 'react';
import { Field } from 'redux-form';
import { Button, Checkbox, DatePicker, Form, Input, Radio, Select, Switch } from "antd";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

const CreateAntReduxField = Component => ({ children, input, meta: { invalid, touched, error }, ...rest }) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      validateStatus={hasError ? 'error' : 'success'}
      help={hasError && error}
    >
      <Component {...input} {...rest} children={children}  />
    </FormItem>
  );
};

const AntCheckbox = CreateAntReduxField(Checkbox);
const AntInput = CreateAntReduxField(Input);
const AntMonthPicker = CreateAntReduxField(MonthPicker);
const AntRadioGroup = CreateAntReduxField(RadioGroup);
const AntRangePicker = CreateAntReduxField(RangePicker);
const AntSelect = CreateAntReduxField(Select);
const AntSwitch = CreateAntReduxField(Switch);
const AntTextArea = CreateAntReduxField(TextArea);
const AntWeekPicker = CreateAntReduxField(WeekPicker);


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

const AntFormSubmit = ({ label, pristine, submitting, style, type }) => (
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

const AntFormButtons = ({ label, pristine, reset, submitting }) => (
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

const AntStepFormButtons = ({ backStyle, backLabel, onClickBack, pristine, submitLabel, submitStyle, submitting }) => (
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

const AntFormFields = ({ FIELDS }) => (
  map(FIELDS, ({ className, checked, component, name, label, normalize, onChange, radioOptions, selectOptions, style, type, validateFields, value }, key) => (
    <div key={key} className={className}>
      <Field
        name={name}
        checked={checked}
        component={component}
        normalize={normalize}
        onChange={onChange}
        placeholder={label}
        style={{ fontSize: 15, ...style }}
        type={type}
        validate={validateFields}
        value={value}
      >
        {selectOptions && map(selectOptions, value => (
          <Option key={value} value={value}>{value}</Option>
        ))}
      </Field>
    </div>
  ))
)

const AntRadioGroupField = ({ name, FIELDS, value, validateFields }) => (
  <div className="plan-selection-container">
    <Field
      name="selectedPlan"
      component={AntRadioGroup}
      style={{ fontSize: 15, width: '100%' }}
      validate={validateFields}
      value={value}
    >
     {map(FIELDS, ({ description, plan, price }, key) => (
        <div key={key} className={ (plan === value) ? "selection-container selected" : "selection-container"}>
          <div className="header">
            <h3 className="plan-title">{plan}</h3>
            <h2 className="price"><span className="price-sign">$</span>{price}</h2>
            <p>per month</p>
          </div>
          <div className="body">
            <div className="description">{description}</div>
          </div>
          <div className="selection">
            <Radio value={plan} />
          </div>
        </div>
      ))}
    </Field>
  </div>
)

export {
  AntCheckbox,
  AntInput,
  AntFormButtons,
  AntFormSubmit,
  AntFormFields,
  AntMonthPicker,
  AntRadioGroupField,
  AntRangePicker,
  AntSelect,
  AntStepFormButtons,
  AntSwitch,
  AntTextArea,
  AntWeekPicker
}
