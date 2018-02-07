import { AntInput, AntSelect } from './antReduxFormFields';
import { allowedCharacters, isRequired, isValidCC, isValidCVV, isValidEmail, isValidExpMonth, isValidPhone, isValidState, isValidYear } from '../formfields/validateFormFields';
import { formatCreditCard, formatCVV, formatPhone, formatState, formatYear, formatZip } from './formatFields';

const ADDRESSFIELDS = [
  { className: "input-75 f-l", component: AntInput, name: "contactAddress", label: "Address", style:{ width: "97%" }, validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", component: AntInput, name: "contactUnit", label: "Unit, Apt, or Suite #", style:{ width: "100%" }, },
  { className: "input-50 f-l", component: AntInput, name: "contactCity", label: "City", style:{ width: "95%" }, validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", component: AntInput, name: "contactState", label: "State", normalize: formatState, style:{ width: "90%" }, validateFields: [isRequired, isValidState] },
  { className: "input-25 f-r", component: AntInput, name: "contactZip", label: "Zip Code", normalize: formatZip, style:{ width: "90%" }, validateFields: [isRequired]},
]

const BILLINGADDRESSFIELDS = [
  { className: "input-75 f-l", component: AntInput, name: "billingAddress", label: "Address", style:{ width: "95%" }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", component: AntInput, name: "billingUnit", label: "Unit, Apt, or Suite #", type: "text", style:{ width: "100%" }, },
  { className: "input-50 f-l", component: AntInput, name: "billingCity", label: "City", style:{ width: "95%" }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", component: AntInput, name: "billingState", label: "State", normalize: formatState, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidState] },
  { className: "input-25 f-r", component: AntInput, name: "billingZip", label: "Zip Code", normalize: formatZip, style:{ width: "100%" }, type: "text", validateFields: [isRequired]},
]


const CONTACTFIELDS = [
  { className: "input-50 f-l", component: AntInput, name: "contactFirstName", label: "First Name", style:{ width: '95%' }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-50 f-r", component: AntInput, name: "contactLastName", label: "Last Name", style:{ width: '95%' }, type: "text", validateFields: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", component: AntInput, name: "contactEmail", label: "Email Address", style:{ width: '95%' }, type: "text", validateFields: [isRequired, isValidEmail] },
  { className: "input-50 f-r", component: AntInput, name: "contactPhone", label: "Phone Number (optional)", normalize: formatPhone, style:{ width: '95%' }, type: "text", validateFields: isValidPhone },
]

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const CREDITCARDFIELDS = [
  { className: "input-40 f-l", component: AntInput, name: "creditCard", label: "Credit Card", normalize: formatCreditCard, style:{ width: "95%" }, type: "text", validateFields: [isRequired, isValidCC] },
  { className: "input-20 f-l", component: AntSelect, name: "creditCardExpMonth", label: "Exp. Month", selectOptions: MENUITEMS, style:{ width: "90%" }, type: "text", validateFields: isValidExpMonth },
  { className: "input-20 f-l", component: AntInput, name: "creditCardExpYear", hintText: "YYYY", label: "Exp. Year", normalize: formatYear, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidYear] },
  { className: "input-20 f-l", component: AntInput, name: "creditCardCVV", hintText: "XXX", label: "CVV", normalize: formatCVV, style:{ width: "90%" }, type: "text", validateFields: [isRequired, isValidCVV] },
]

const PLANSELECTIONFIELDS = [
  { description: "Video subscription", price:"20.00", plan: "Carlotta Prime" },
  { description: "CPA subscription", price:"49.99", plan: "Carlotta Tax Consultants" },
  { description: "Twitch subscription", price:"4.99", plan: "Carlotta Twitch Prime" },
  { description: "Youtube subscription", price:"9.99", plan: "Carlotta Youtube Red" },
  { description: "Webdesign subscription", price:"19.99", plan: "Carlotta Webdesign Consultants" },
  { description: "Omnipotent subscription", price:"99.99", plan: "Carlotta Corp" }
]

const CustomerFormFields = [
  {
    billingSwitch: false,
    LEFTFIELDS: CONTACTFIELDS,
    leftTitle: "Contact Information",
    PLANSELECTIONS: null,
    PLANSELECTIONFIELDS: null,
    mainTitle: null,
    RIGHTFIELDS: ADDRESSFIELDS,
    rightTitle: "Address",
  },
  {
    billingSwitch: true,
    LEFTFIELDS: BILLINGADDRESSFIELDS,
    leftTitle: "Billing Address",
    PLANSELECTIONS: null,
    PLANSELECTIONFIELDS: null,
    mainTitle: null,
    RIGHTFIELDS: CREDITCARDFIELDS,
    rightTitle: "Credit Card Information",
  },
  {
    billingSwitch: false,
    LEFTFIELDS: null,
    leftTitle: null,
    PLANSELECTIONS: null,
    PLANSELECTIONFIELDS: PLANSELECTIONFIELDS,
    mainTitle: null,
    RIGHTFIELDS: null,
    rightTitle: null
  },
  {
    billingSwitch: false,
    LEFTFIELDS: null,
    leftTitle: null,
    PLANSELECTIONS: PLANSELECTIONFIELDS,
    PLANSELECTIONFIELDS: null,
    mainTitle: "<span>You're almost done. Please <strong>review</strong> the information below and <strong>subscribe to the plan</strong>.</span>",
    RIGHTFIELDS: null,
    rightTitle: null,
  }
]

export const getCustomerFormFields = (key) => {
  const formKey = key ? key : 0
  return {
    ...CustomerFormFields[formKey]
  }
}
