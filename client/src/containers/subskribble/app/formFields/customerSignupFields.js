import { AntSelect } from './antReduxFormFields';
import { allowedCharacters, isNumber, isRequired, isValidCC, isValidCVV, isValidEmail, isValidExpMonth, isValidPhone, isValidState, isValidYear, isValidZip } from './validateFormFields';
import { formatCreditCard, formatCVV, formatPhone, formatState, formatYear, formatZip } from './formatFields';

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const BILLINGADDRESSFIELDS = [
	{ className: "input-50 f-l", name: "billingAddress", placeholder: "Billing Address", type: "text", validate: [isRequired, allowedCharacters] },
	{ className: "input-25 f-l", name: "billingUnit", placeholder: "Billing Unit, Apt, or Suite #", type: "text" },
	{ className: "input-40 f-l", name: "billingCity", placeholder: "Billing City", type: "text", validate: [isRequired, allowedCharacters] },
	{ className: "input-20 f-l", name: "billingState", placeholder: "Billing State", normalize: formatState, type: "text", validate: [isRequired, isValidState, allowedCharacters] },
	{ className: "input-20 f-l", name: "billingZip", placeholder: "Billing Zip Code", normalize: formatZip, type: "text", validate: [isRequired, isValidZip, isNumber]}
]

const CREDITCARDFIELDS = [
	{ className: "input-40 f-l", name: "creditCard", placeholder: "Credit Card", normalize: formatCreditCard, type: "text", validate: [isRequired, isValidCC] },
	{ className: "input-20 f-l", component: AntSelect, name: "creditCardExpMonth", placeholder: "Exp. Month", selectOptions: MENUITEMS, type: "text", validate: isValidExpMonth },
	{ className: "input-20 f-l", name: "creditCardExpYear", placeholder: "Exp. Year", normalize: formatYear, type: "text", validate: [isRequired, isValidYear, isNumber] },
	{ className: "input-10 f-l", name: "creditCardCVV", placeholder: "CVV", normalize: formatCVV, type: "text", validate: [isRequired, isValidCVV, isNumber] }
]

const CONTACTFIELDS = [
	{ className: "input-40 f-l", name: "contactFirstName", placeholder: "First Name", type: "text", validate: [isRequired, allowedCharacters] },
	{ className: "input-40 f-l", name: "contactLastName", placeholder: "Last Name", type: "text", validate: [isRequired, allowedCharacters] },
	{ className: "input-55 f-l", name: "contactAddress", placeholder: "Address", validate: [isRequired, allowedCharacters] },
	{ className: "input-25 f-l", name: "contactUnit", placeholder: "Unit, Apt, or Suite #", style:{ width: "100%" }, },
	{ className: "input-40 f-l", name: "contactCity", placeholder: "City", validate: [isRequired, allowedCharacters] },
	{ className: "input-20 f-l", name: "contactState", placeholder: "State", normalize: formatState, validate: [isRequired, isValidState, allowedCharacters] },
	{ className: "input-20 f-l", name: "contactZip", placeholder: "Zip Code", normalize: formatZip, validate: [isRequired, isValidZip, isNumber]},
	{ className: "input-40 f-l", name: "contactEmail", placeholder: "Email Address", type: "text", validate: [isRequired, isValidEmail] },
	{ className: "input-40 f-l", name: "contactPhone", placeholder: "Phone Number (optional)", normalize: formatPhone, type: "text", validate: [isValidPhone] },
]

const CustomerFormFields = [
	{
		BILLINGADDRESSFIELDS,
		CONTACTFIELDS,
		CREDITCARDFIELDS,
		leftTitle: "Contact Information",
		mainTitle: "<span>Please fill out the information below and click <strong>next</strong> to continue.</span>",
		rightTitle: "Billing Information",
	},
	{
		BILLINGADDRESSFIELDS: null,
		CONTACTFIELDS: null,
		CREDITCARDFIELDS: null,
		leftTitle: null,
		mainTitle: "<span>Please <strong>select</strong> a plan below and click <strong>next</strong> to continue.</span>",
		rightTitle: null
	},
	{
		mainTitle: "<span>You're almost done. Please <strong>review</strong> the information below and <strong>subscribe to the plan</strong>.</span>",
	}
]

export const getCustomerFormFields = key => ({...CustomerFormFields[key ? key : 0]})
