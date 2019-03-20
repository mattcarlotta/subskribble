import React from 'react';
import { AntSelect } from 'containers/app/formFields/antReduxFormFields.js';
import {
  allowedCharacters,
  isNumber,
  isRequired,
  isValidCC,
  isValidCVV,
  isValidEmail,
  isValidExpMonth,
  isValidPhone,
  isValidState,
  isValidYear,
  isValidZip,
} from 'containers/app/formFields/validateFormFields.js';
import {
  formatCreditCard,
  formatCVV,
  formatPhone,
  formatState,
  formatYear,
  formatZip,
} from 'containers/app/formFields/formatFields.js';
import styles from './customerFields.scss';

const MENUITEMS = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const BILLINGADDRESSFIELDS = [
  {
    className: `${styles.input50} f-l`,
    name: 'billingAddress',
    placeholder: 'Billing Address',
    type: 'text',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input25} f-l`,
    name: 'billingUnit',
    placeholder: 'Billing Unit, Apt, or Suite #',
    type: 'text',
  },
  {
    className: `${styles.input40} f-l`,
    name: 'billingCity',
    placeholder: 'Billing City',
    type: 'text',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input20} f-l`,
    name: 'billingState',
    placeholder: 'Billing State',
    normalize: formatState,
    type: 'text',
    validate: [isRequired, isValidState, allowedCharacters],
  },
  {
    className: `${styles.input20} f-l`,
    name: 'billingZip',
    placeholder: 'Billing Zip Code',
    normalize: formatZip,
    type: 'text',
    validate: [isRequired, isValidZip, isNumber],
  },
];

const CREDITCARDFIELDS = [
  {
    className: `${styles.input40} f-l`,
    name: 'creditCard',
    placeholder: 'Credit Card',
    normalize: formatCreditCard,
    type: 'text',
    validate: [isRequired, isValidCC],
  },
  {
    className: `${styles.input20} f-l`,
    component: AntSelect,
    name: 'creditCardExpMonth',
    placeholder: 'Exp. Month',
    selectOptions: MENUITEMS,
    type: 'text',
    validate: isValidExpMonth,
  },
  {
    className: `${styles.input20} f-l`,
    name: 'creditCardExpYear',
    placeholder: 'Exp. Year',
    normalize: formatYear,
    type: 'text',
    validate: [isRequired, isValidYear, isNumber],
  },
  {
    className: `${styles.input10} f-l`,
    name: 'creditCardCVV',
    placeholder: 'CVV',
    normalize: formatCVV,
    type: 'text',
    validate: [isRequired, isValidCVV, isNumber],
  },
];

const CONTACTFIELDS = [
  {
    className: `${styles.input40} f-l`,
    name: 'contactFirstName',
    placeholder: 'First Name',
    type: 'text',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input40} f-l`,
    name: 'contactLastName',
    placeholder: 'Last Name',
    type: 'text',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input55} f-l`,
    name: 'contactAddress',
    placeholder: 'Address',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input25} f-l`,
    name: 'contactUnit',
    placeholder: 'Unit, Apt, or Suite #',
    style: { width: '100%' },
  },
  {
    className: `${styles.input40} f-l`,
    name: 'contactCity',
    placeholder: 'City',
    validate: [isRequired, allowedCharacters],
  },
  {
    className: `${styles.input20} f-l`,
    name: 'contactState',
    placeholder: 'State',
    normalize: formatState,
    validate: [isRequired, isValidState, allowedCharacters],
  },
  {
    className: `${styles.input20} f-l`,
    name: 'contactZip',
    placeholder: 'Zip Code',
    normalize: formatZip,
    validate: [isRequired, isValidZip, isNumber],
  },
  {
    className: `${styles.input40} f-l`,
    name: 'contactEmail',
    placeholder: 'Email Address',
    type: 'text',
    validate: [isRequired, isValidEmail],
  },
  {
    className: `${styles.input40} f-l`,
    name: 'contactPhone',
    placeholder: 'Phone Number (optional)',
    normalize: formatPhone,
    type: 'text',
    validate: [isValidPhone],
  },
];

const CustomerFormFields = [
  {
    BILLINGADDRESSFIELDS,
    CONTACTFIELDS,
    CREDITCARDFIELDS,
    leftTitle: 'Contact Information',
    mainTitle: [
      <span key="Contact-Information">
        Please fill out the information below and click <strong>next</strong> to
        continue.
      </span>,
    ],
    rightTitle: 'Billing Information',
  },
  {
    BILLINGADDRESSFIELDS: null,
    CONTACTFIELDS: null,
    CREDITCARDFIELDS: null,
    leftTitle: null,
    mainTitle: [
      <span key="Select-Plan">
        Please <strong>select</strong> a plan below and click{' '}
        <strong>next</strong> to continue.
      </span>,
    ],
    rightTitle: null,
  },
  {
    mainTitle: [
      <span key="Checkout">
        {`You're almost done. Please `} <strong>review</strong>
        {` the information below and `}
        <strong>subscribe to the plan.</strong>
      </span>,
    ],
  },
];

export const getCustomerFormFields = key => ({
  ...CustomerFormFields[key || 0],
});
