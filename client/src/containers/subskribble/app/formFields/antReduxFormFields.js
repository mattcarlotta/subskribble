import map from 'lodash/map';
import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Button, Col, Checkbox, DatePicker, Form, Icon, Input, InputNumber, Modal, Radio, Select, Slider, Switch, Upload } from "antd";

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
const AntSlider = CreateAntReduxField(Slider);
const AntSwitch = CreateAntReduxField(Switch);
const AntTextArea = CreateAntReduxField(TextArea);
const AntWeekPicker = CreateAntReduxField(WeekPicker);

const AntSubmitButton = ({ column, confirmLoading, disabled, icon, label, onClick, style, type }) => (
	<Col span={column}>
		<Button
			type="primary"
			className={(disabled) ? "btn-disabled" : null }
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

const AntStepFormButtons = ({ backStyle, backLabel, column, confirmLoading, onClickBack, pristine, submitLabel, submitStyle, submitting, type }) => (
	<FormItem>
		<AntSubmitButton
			column={column}
			icon="left"
			disabled={confirmLoading}
			label={backLabel}
			onClick={onClickBack}
			style={backStyle}
			type={type}
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

const AntFormFieldsWithLabels = ({ FIELDS }) => (
	map(FIELDS, ({ component, className, label, selectOptions, style, ...props}, key) => (
		<div className="input-with-labels" key={key}>
			<span className="input-label">
				{label}
			</span>
			<div className={`input-container ${className}`}>
				<Field
					component={component || AntInput}
					{...props}
					style={{ fontSize: 15, ...style }}
					>
						{selectOptions && map(selectOptions, value => (<Option key={value} value={value}>{value}</Option>))}
					</Field>
				</div>
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
	input,
	meta,
	children,
	hasFeedback,
	label,
	...rest
}) => {
	const hasError = meta.touched && meta.invalid;
	return (
		<FormItem
			label={label}
			validateStatus={hasError ? "error" : "success"}
			hasFeedback={hasFeedback && hasError}
			help={hasError && meta.error}
		>
			<RangePicker
				{...input}
				{...rest}
				children={children}
				format="MMMM, DD YYYY"
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

const AntUpload = ({
	children,
	handleCancel,
	input,
	meta: { invalid, touched, error },
	label,
	imageUrl,
	previewImage,
	...props
}) => {
	const hasError = touched && invalid;
	return (
		<FormItem
			label={label}
			help={hasError && error}
			validateStatus={hasError ? "error" : "success"}
		>
			<Upload
				{ ...input }
				{ ...props }
				accept={'image/*'}
				customRequest={() => null}
				className="avatar-uploader"
				listType="picture-card"
				showUploadList={true}
			>
				{ !imageUrl
					? <div className="upload-container">
							<i className="material-icons upload-icon">cloud_upload</i>
							<div>(click to browse)</div>
						</div>
					: null
				}
			</Upload>
			<Modal
				onCancel={handleCancel}
				visible={previewImage}
				footer={null}
				width={330}
			>
				<img src={imageUrl} alt="example"/>
			</Modal>
		</FormItem>
	);
};


export {
	AntCheckbox,
	AntInput,
	AntInputNumber,
	AntFormButtons,
	AntFormSubmit,
	AntFormFields,
	AntFormFieldsWithLabels,
	AntMonthPicker,
	AntRadioGroupField,
	AntRangePicker,
	AntSelect,
	AntSelectField,
	AntSlider,
	AntStepFormButtons,
	AntSwitch,
	AntSwitchField,
	AntTextArea,
	AntUpload,
	AntWeekPicker
}
