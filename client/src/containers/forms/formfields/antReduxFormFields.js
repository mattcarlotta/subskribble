import map from 'lodash/map';
import React from 'react';
import { Field } from 'redux-form';
import { Button, Checkbox, DatePicker, Form, Icon, Input, Radio, Select, Switch } from "antd";

const FormItem = Form.Item;
const { Button: RadioButton, Group: RadioGroup } = Radio;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

const CreateAntReduxField = Component => ({ children, input, meta: { invalid, touched, error }, hasFeedback, ...props }) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      hasFeedback={hasFeedback && hasError}
      help={hasError && error}
      validateStatus={hasError ? 'error' : 'success'}
    >
      <Component {...input} {...props} children={children}  />
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
  map(FIELDS, ({ className, checked, component, name, label, normalize, onChange, selectOptions, style, type, validateFields, value }, key) => (
    <div key={key} className={className}>
      <Field
        checked={checked}
        component={component}
        name={name}
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
        <RadioButton
          className={(plan === value) ? "selection-container selected" : "selection-container"}
          key={key}
          value={plan}
        >
          <div className="header">
            <h3 className="plan-title">{plan}</h3>
            <h2 className="price"><span className="price-sign">$</span>{price}</h2>
            <p>per month</p>
          </div>
          <div className="body">
            <div className="description">{description}</div>
          </div>
        </RadioButton>
      ))}
    </Field>
  </div>
)

const AntSwitchField = ({ checked, name, onChange, value }) => (
  <Field
    checked={checked}
    checkedChildren={<Icon type="check" />}
    component={AntSwitch}
    name={name}
    onChange={onChange}
    unCheckedChildren={<Icon type="cross" />}
    value={value}
  />
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
  AntSwitchField,
  AntTextArea,
  AntWeekPicker
}
