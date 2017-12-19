import { SelectField, Toggle } from 'redux-form-material-ui';
import { allowedCharacters, isRequired, isValidEmail, isValidState } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVC, formatPhone, formatState, formatYear, formatZip } from './formatFields';

export const ADDRESSFIELDS = [
  { className: "input-75 f-l", name: "contactAddress", floatingLabelText: "Address", width: "95%", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", name: "contactunit", floatingLabelText: "Unit, Apt, or Suite #", width: "100%", },
  { className: "input-50 f-l", name: "contactCity", floatingLabelText: "City", width: "95%", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", name: "contactState", floatingLabelText: "State", normalize: formatState, width: "90%", validate: [isRequired, isValidState] },
  { className: "input-25 f-r", name: "contactZip", floatingLabelText: "Zip Code", normalize: formatZip, width: "100%", validate: [isRequired]},
]

export const billingAddressFields = (setField, resetField) => {
  return [
    { component: Toggle, name: "sameBillingAddress", label: "Same As Address", labelPosition: "right", onChange: (e, index, value ) => !value ? setField() : resetField(),  width: "95%", validate: [isRequired, allowedCharacters] },
    { className: "input-75 f-l", name: "billingAddress", floatingLabelText: "Address", width: "95%", validate: [isRequired, allowedCharacters] },
    { className: "input-25 f-r", name: "billingUnit", floatingLabelText: "Unit, Apt, or Suite #", width: "100%", },
    { className: "input-50 f-l", name: "billingCity", floatingLabelText: "City", width: "95%", validate: [isRequired, allowedCharacters] },
    { className: "input-25 f-l", name: "billingState", floatingLabelText: "State", width: "90%", validate: [isRequired, isValidState], normalize: formatState },
    { className: "input-25 f-r", name: "billingZip", floatingLabelText: "Zip Code", width: "100%", validate: [isRequired], normalize: formatZip},
  ]
}

export const CONTACTFIELDS = [
  { className: "input-50 f-l", name: "contactFirstName", floatingLabelText: "First Name", width: '95%', validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-r", name: "contactLastName", floatingLabelText: "Last Name", width: '95%', validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", name: "contactEmail", floatingLabelText: "Email Address", width: '95%', validate: [isRequired, isValidEmail] },
  { className: "input-50 f-r", name: "contactPhone", normalize: formatPhone, width: '95%', floatingLabelText: "Phone Number (optional)" },
]

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

export const CREDITCARDFIELDS = [
  { className: "input-40 f-l", name: "creditCard", floatingLabelText: "Credit Card", normalize: formatCreditCard, validate: isRequired, width: "95%" },
  { className: "input-20 f-l", name: "creditCardExpMonth", component: SelectField, floatingLabelText: "Exp. Month", validate: isRequired, width: "90%", MENUITEMS },
  { className: "input-20 f-l", name: "creditCardExpYear", hintText: "YYYY", floatingLabelText: "Exp. Year", normalize: formatYear, validate: isRequired, width: "90%" },
  { className: "input-20 f-l", name: "creditCardCVC", hintText: "XXX", floatingLabelText: "CVC", normalize: formatCVC, validate: isRequired, width: "90%" },
]
