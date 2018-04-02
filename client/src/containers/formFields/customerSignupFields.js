import { AntSelect } from './antReduxFormFields';
import { allowedCharacters, isRequired, isValidCC, isValidCVV, isValidEmail, isValidExpMonth, isValidPhone, isValidState, isValidYear } from './validateFormFields';
import { formatCreditCard, formatCVV, formatPhone, formatState, formatYear, formatZip } from './formatFields';

const MENUITEMS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const BILLINGADDRESSFIELDS = [
  { className: "input-50 f-l", name: "billingAddress", placeholder: "Billing Address", type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", name: "billingUnit", placeholder: "Billing Unit, Apt, or Suite #", type: "text" },
  { className: "input-40 f-l", name: "billingCity", placeholder: "Billing City", type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-20 f-l", name: "billingState", placeholder: "Billing State", normalize: formatState, type: "text", validate: [isRequired, isValidState] },
  { className: "input-20 f-l", name: "billingZip", placeholder: "Billing Zip Code", normalize: formatZip, type: "text", validate: [isRequired]},
  { className: "input-40 f-l", name: "creditCard", placeholder: "Credit Card", normalize: formatCreditCard, type: "text", validate: [isRequired, isValidCC] },
  { className: "input-20 f-l", component: AntSelect, name: "creditCardExpMonth", placeholder: "Exp. Month", selectOptions: MENUITEMS, type: "text", validate: isValidExpMonth },
  { className: "input-20 f-l", name: "creditCardExpYear", placeholder: "Exp. Year", normalize: formatYear, type: "text", validate: [isRequired, isValidYear] },
  { className: "input-10 f-l", name: "creditCardCVV", placeholder: "CVV", normalize: formatCVV, type: "text", validate: [isRequired, isValidCVV] },
]

const CONTACTFIELDS = [
  { className: "input-40 f-l", name: "contactFirstName", placeholder: "First Name", type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-40 f-l", name: "contactLastName", placeholder: "Last Name", type: "text", validate: [isRequired, allowedCharacters] },
  { className: "input-50 f-l", name: "contactAddress", placeholder: "Address", validate: [isRequired, allowedCharacters] },
  { className: "input-25 f-l", name: "contactUnit", placeholder: "Unit, Apt, or Suite #", style:{ width: "100%" }, },
  { className: "input-40 f-l", name: "contactCity", placeholder: "City", validate: [isRequired, allowedCharacters] },
  { className: "input-20 f-l", name: "contactState", placeholder: "State", normalize: formatState, validate: [isRequired, isValidState] },
  { className: "input-20 f-l", name: "contactZip", placeholder: "Zip Code", normalize: formatZip, validate: [isRequired]},
  { className: "input-40 f-l", name: "contactEmail", placeholder: "Email Address", type: "text", validate: [isRequired, isValidEmail] },
  { className: "input-40 f-l", name: "contactPhone", placeholder: "Phone Number (optional)", normalize: formatPhone, type: "text", validate: isValidPhone },
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
    billingSwitch: true,
    LEFTFIELDS: CONTACTFIELDS,
    leftTitle: "Contact Information",
    PLANSELECTIONS: null,
    PLANSELECTIONFIELDS: null,
    mainTitle: null,
    RIGHTFIELDS: BILLINGADDRESSFIELDS,
    rightTitle: "Billing Information",
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
