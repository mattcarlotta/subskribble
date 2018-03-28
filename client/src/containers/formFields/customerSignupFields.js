import { AntInput, AntSelect } from './antReduxFormFields';
import { allowedCharacters, isRequired, isValidCC, isValidCVV, isValidEmail, isValidExpMonth, isValidPhone, isValidState, isValidYear } from './validateFormFields';
import { formatCreditCard, formatCVV, formatPhone, formatState, formatYear, formatZip } from './formatFields';

const ADDRESSFIELDS = [
  { className: "input-75 f-l", component: AntInput, name: "contactAddress", placeholder: "Address", style:{ width: "97%" }, validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", component: AntInput, name: "contactUnit", placeholder: "Unit, Apt, or Suite #", style:{ width: "100%" }, },
  { className: "input-50 f-l", component: AntInput, name: "contactCity", placeholder: "City", style:{ width: "95%" }, validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", component: AntInput, name: "contactState", placeholder: "State", normalize: formatState, style:{ width: "90%" }, validate: [isRequired, isValidState] },
  { className: "input-25 f-r", component: AntInput, name: "contactZip", placeholder: "Zip Code", normalize: formatZip, style:{ width: "90%" }, validate: [isRequired]},
]

const BILLINGADDRESSFIELDS = [
  { className: "input-75 f-l", component: AntInput, name: "billingAddress", placeholder: "Address", style:{ width: "95%" }, type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-r", component: AntInput, name: "billingUnit", placeholder: "Unit, Apt, or Suite #", type: "text", style:{ width: "100%" }, },
  { className: "input-50 f-l", component: AntInput, name: "billingCity", placeholder: "City", style:{ width: "95%" }, type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", component: AntInput, name: "billingState", placeholder: "State", normalize: formatState, style:{ width: "90%" }, type: "text", validate: [isRequired, isValidState] },
  { className: "input-25 f-r", component: AntInput, name: "billingZip", placeholder: "Zip Code", normalize: formatZip, style:{ width: "100%" }, type: "text", validate: [isRequired]},
]

const CONTACTFIELDS = [
  { className: "input-50 f-l", component: AntInput, name: "contactFirstName", placeholder: "First Name", style:{ width: '95%' }, type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-r", component: AntInput, name: "contactLastName", placeholder: "Last Name", style:{ width: '95%' }, type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", component: AntInput, name: "contactEmail", placeholder: "Email Address", style:{ width: '95%' }, type: "text", validate: [isRequired, isValidEmail] },
  { className: "input-50 f-r", component: AntInput, name: "contactPhone", placeholder: "Phone Number (optional)", normalize: formatPhone, style:{ width: '95%' }, type: "text", validate: isValidPhone },
]

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const CREDITCARDFIELDS = [
  { className: "input-40 f-l", component: AntInput, name: "creditCard", placeholder: "Credit Card", normalize: formatCreditCard, style:{ width: "95%" }, type: "text", validate: [isRequired, isValidCC] },
  { className: "input-20 f-l", component: AntSelect, name: "creditCardExpMonth", placeholder: "Exp. Month", selectOptions: MENUITEMS, style:{ width: "90%" }, type: "text", validate: isValidExpMonth },
  { className: "input-20 f-l", component: AntInput, name: "creditCardExpYear", placeholder: "Exp. Year", normalize: formatYear, style:{ width: "90%" }, type: "text", validate: [isRequired, isValidYear] },
  { className: "input-20 f-l", component: AntInput, name: "creditCardCVV", placeholder: "CVV", normalize: formatCVV, style:{ width: "90%" }, type: "text", validate: [isRequired, isValidCVV] },
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

export const getCustomerFormFields = key => ({...CustomerFormFields[key ? key : 0]})
