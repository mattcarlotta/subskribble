import { allowedCharacters, isRequired, isValidEmail, isValidState } from '../formfields/validateFormFields';
import { formatPhone, formatState, formatZip } from './formatFields';


export const ADDRESSFIELDS = [
  { className: "input-75 f-l", name: "address", label: "Address", width: "95%", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", name: "unit", label: "Unit, Apt, or Suite #", width: "100%", },
  { className: "input-50 f-l", name: "city", label: "City", width: "95%", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", name: "state", label: "State", width: "90%", validate: [isRequired, isValidState], normalize: formatState },
  { className: "input-25 f-r", name: "zip", label: "Zip Code", width: "100%", validate: [isRequired], normalize: formatZip},
]

export const CONTACTFIELDS = [
  { className: "input-50 f-l", name: "firstName", label: "First Name", validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-r", name: "lastName", label: "Last Name", validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", name: "email", label: "Email Address", validate: [isRequired, isValidEmail] },
  { className: "input-50 f-r", name: "phone", label: "Phone Number (optional)", normalize: formatPhone },
]
