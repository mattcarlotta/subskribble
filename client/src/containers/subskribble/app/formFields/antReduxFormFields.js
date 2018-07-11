import map from 'lodash/map';
import React, { Fragment } from 'react';
import moment from 'moment';
import { Field } from 'redux-form';
import { Button, Col, Checkbox, DatePicker, Form, Icon, Input, InputNumber, Radio, Select, Switch } from "antd";

const FormItem = Form.Item;
const { Button: RadioButton, Group: RadioGroup } = Radio;
const { TextArea } = Input;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;

const CreateAntReduxField = Component => ({
  children,
  input,
  meta: { invalid, touched, error },
  label,
  formItemClassName,
  hasFeedback,
  ...props
}) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      className={formItemClassName}
      label={label}
      hasFeedback={hasFeedback && touched}
      help={hasError && error}
      validateStatus={hasError ? "error" : "success"}
    >
      <Component {...input} {...props} children={children} />
    </FormItem>
  );
};

const AntCheckbox = CreateAntReduxField(Checkbox);
const AntInput = CreateAntReduxField(Input);
const AntInputNumber = CreateAntReduxField(InputNumber);
const AntMonthPicker = CreateAntReduxField(MonthPicker);
const AntRadioGroup = CreateAntReduxField(RadioGroup);
// const ARangePicker = CreateAntReduxField(RangePicker);
// const AntSelect = CreateAntReduxField(Select);
const AntSwitch = CreateAntReduxField(Switch);
const AntTextArea = CreateAntReduxField(TextArea);
const AntWeekPicker = CreateAntReduxField(WeekPicker);

const AntSubmitButton = ({ column, confirmLoading, disabled, icon, label, onClick, style, type }) => (
  <Col span={column}>
    <Button
      type="primary"
      disabled={disabled}
      htmlType={type}
      loading={confirmLoading}
      onClick={onClick}
      style={{ ...style }}
      >
        {icon === "left"
        ? <Fragment>
          <Icon type={icon} /> { label }
        </Fragment>
        : <Fragment>
          { label } <Icon type={icon} />
        </Fragment>
      }
    </Button>
  </Col>
)

const AntFormSubmit = (props) => (
  <FormItem>
    <AntSubmitButton {...props} type="submit"/>
  </FormItem>
)

const AntFormButtons = ({ label, pristine, reset, submitting }) => (
  <FormItem>
    <AntSubmitButton label={label} type="submit" />
    <Button disabled={pristine || submitting} onClick={reset}>
      Clear Values
    </Button>
  </FormItem>
)

const AntStepFormButtons = ({ backStyle, backLabel, column, confirmLoading, onClickBack, pristine, submitLabel, submitStyle, submitting }) => (
  <FormItem>
    <AntSubmitButton
      column={column}
      icon="left"
      disabled={confirmLoading}
      label={backLabel}
      onClick={onClickBack}
      style={backStyle}
    />
    <AntSubmitButton
      column={column}
      confirmLoading={confirmLoading}
      icon={submitLabel === "Next" ? "right" : ""}
      label={submitLabel}
      pristine={pristine}
      style={submitStyle}
      submitting={submitting}
      type="submit"
    />
  </FormItem>
)

const AntFormFields = ({ FIELDS }) => (
  map(FIELDS, ({ component, className, selectOptions, style, ...props}, key) => (
    <div key={key} className={className}>
      <Field
        component={component || AntInput}
        {...props}
        style={{ fontSize: 15, ...style }}
        hasFeedback
      >
        {selectOptions && map(selectOptions, value => (<Option key={value} value={value}>{value}</Option>))}
      </Field>
    </div>
  ))
)

const AntRadioGroupField = ({ FIELDS, value, ...props }) => (
  <div className="plan-selection-container">
    <Field
      {...props}
      value={value}
      component={AntRadioGroup}
    >
     {map(FIELDS, ({ description, planname, amount }, key) => (
        <RadioButton
          className={`selection-container ${(planname === value) ? "selected" : ""}`}
          key={key}
          value={planname}
        >
          <div className="header">
            <h3 className="plan-title">{planname}</h3>
            <h2 className="price"><span className="price-sign">$</span>{amount}</h2>
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

const AntRangePicker = ({
  children,
  input: { value, ...inputMethods },
  meta: { invalid, touched, error },
  label,
  hasFeedback,
  ...props
}) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      label={label}
      hasFeedback={hasFeedback && touched}
      help={hasError && error}
      validateStatus={hasError ? "error" : "success"}
    >
      <RangePicker
        {...inputMethods}
        {...props}
        children={children}
        format="MMMM/DD/YYYY"
        placeholder={['Start Date', 'End Date']}
        ranges={{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }}
      />
    </FormItem>
  );
};

const AntSelect = ({
  children,
  input: { value, ...inputMethods },
  meta: { invalid, touched, error },
  label,
  hasFeedback,
  ...props
}) => {
  const hasError = touched && invalid;
  return (
    <FormItem
      label={label}
      hasFeedback={hasFeedback && touched}
      help={hasError && error}
      validateStatus={hasError ? "error" : "success"}
    >
      <Select {...inputMethods} {...props} children={children} />
    </FormItem>
  );
};

const AntSelectField = ({ className, selectOptions, ...props }) => (
  <div className={className}>
    <Field
      {...props}
      component={AntSelect}
      hasFeedback
    >
      {selectOptions && map(selectOptions, (name) => (<Option key={name}>{name}</Option>))}
    </Field>
  </div>
)

const AntSwitchField = (props) => (
  <Field
    {...props}
    checkedChildren={<Icon type="check" />}
    component={AntSwitch}
    unCheckedChildren={<Icon type="cross" />}
  />
)



export {
  AntCheckbox,
  AntInput,
  AntInputNumber,
  AntFormButtons,
  AntFormSubmit,
  AntFormFields,
  AntMonthPicker,
  AntRadioGroupField,
  AntRangePicker,
  AntSelect,
  AntSelectField,
  AntStepFormButtons,
  AntSwitch,
  AntSwitchField,
  AntTextArea,
  AntWeekPicker
}
