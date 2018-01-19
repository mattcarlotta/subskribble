import { AntInput, AntSelect, AntSwitch } from './antReduxFormFields';
import { allowedCharacters, isRequired, isValidCC, isValidCVV, isValidEmail, isValidPhone, isValidState, isValidYear } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVV, formatPhone, formatState, formatYear, formatZip } from './formatFields';

export const ADDRESSFIELDS = [
  { className: "input-75 f-l", component: AntInput, name: "contactAddress", label: "Address", style:{ width: "95%" }, validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", component: AntInput, name: "contactUnit", label: "Unit, Apt, or Suite #", style:{ width: "100%" }, },
  { className: "input-50 f-l", component: AntInput, name: "contactCity", label: "City", style:{ width: "95%" }, validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", component: AntInput, name: "contactState", label: "State", normalize: formatState, style:{ width: "90%" }, validateFields: [isRequired, isValidState] },
  { className: "input-25 f-r", component: AntInput, name: "contactZip", label: "Zip Code", normalize: formatZip, style:{ width: "100%" }, validateFields: [isRequired]},
]

export const billingAddressFields = (setField, resetField) => {
  return [
    { className: "", component: AntSwitch, name: "sameBillingAddress", onChange: (e, index, value ) => !value ? setField() : resetField(),  style:{ width: "20" } },
    { className: "input-75 f-l", component: AntInput, name: "billingAddress", label: "Address", style:{ width: "95%" }, type: "text", validateFields: [isRequired, allowedCharacters] },
    { className: "input-25 f-r", component: AntInput, name: "billingUnit", label: "Unit, Apt, or Suite #", type: "text", style:{ width: "100%" }, },
    { className: "input-50 f-l", component: AntInput, name: "billingCity", label: "City", style:{ width: "95%" }, type: "text", validateFields: [isRequired, allowedCharacters] },
    { className: "input-25 f-l", component: AntInput, name: "billingState", label: "State", normalize: formatState, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidState] },
    { className: "input-25 f-r", component: AntInput, name: "billingZip", label: "Zip Code", normalize: formatZip, style:{ width: "100%" }, type: "text", validateFields: [isRequired]},
  ]
}

export const CONTACTFIELDS = [
  { className: "input-50 f-l", component: AntInput, name: "contactFirstName", label: "First Name", style:{ width: '95%' }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-50 f-r", component: AntInput, name: "contactLastName", label: "Last Name", style:{ width: '95%' }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", component: AntInput, name: "contactEmail", label: "Email Address", style:{ width: '95%' }, type: "text", validateFields: [isRequired, isValidEmail] },
  { className: "input-50 f-r", component: AntInput, name: "contactPhone", label: "Phone Number (optional)", normalize: formatPhone, style:{ width: '95%' }, type: "text", validateFields: isValidPhone },
]

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export const CREDITCARDFIELDS = [
  { className: "input-40 f-l", component: AntInput, name: "creditCard", label: "Credit Card", normalize: formatCreditCard, style:{ width: "95%" }, type: "text", validateFields: [isRequired, isValidCC] },
  { className: "input-20 f-l", component: AntSelect, name: "creditCardExpMonth", label: "Exp. Month", selectOptions: MENUITEMS, style:{ width: "90%" }, type: "text", validateFields: isRequired },
  { className: "input-20 f-l", component: AntInput, name: "creditCardExpYear", hintText: "YYYY", label: "Exp. Year", normalize: formatYear, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidYear] },
  { className: "input-20 f-l", component: AntInput, name: "creditCardCVV", hintText: "XXX", label: "CVV", normalize: formatCVV, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidCVV] },
]

export const PLANSELECTIONFIELDS = [
  { description: "Video subscription", price:"20.00", plan: "Carlotta Prime" },
  { description: "CPA subscription", price:"49.99", plan: "Carlotta Tax Consultants" },
  { description: "Twitch subscription", price:"4.99", plan: "Carlotta Twitch Prime" },
  { description: "Youtube subscription", price:"9.99", plan: "Carlotta Youtube Red" },
  { description: "Webdesign subscription", price:"19.99", plan: "Carlotta Webdesign Consultants" },
  { description: "Omnipotent subscription", price:"99.99", plan: "Carlotta Corp" }
]
