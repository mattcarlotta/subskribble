import isEmpty from 'lodash/isEmpty';

const allowedCharacters = value => (/[~`'@#$%&*+=[\]\\/{}|\\":<>]/g.test(value)) ? 'Please remove any special characters' : undefined;
const hasDates = value => value && value.length !== 2 ? 'You must select 2 dates' : undefined;
const isFloat = value => value && !(/^[0-9]+\.[0-9]{2}$/.test(value)) ? 'Please specify a dollar amount (0.00)' : undefined;
const isNotEmpty = value => isEmpty(value) ? 'You must include at least one item' : undefined;
const isNumber = value => !(/^\d+$/.test(value)) ? 'Please only use whole numbers' : undefined;
const isRequired = value => !value ? 'Required' : undefined;
const isSelected = value => !value ? 'Please select a plan' : undefined;
const isValidCC = value => value.length < 19 ? 'Invalid Credit Card' : undefined;
const isValidCVV = value => value.length < 3 ? 'Invalid CVV' : undefined;
const isValidEmail = value => (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) ? 'Invalid email address' : undefined;
const isValidExpMonth = value => value === 'Exp. Month' ? 'Required' : undefined;
const isValidPhone = value => value && value.length >= 1 && value.length !== 14 ? "Invalid phone number" : undefined;
const isValidState = value =>
(!/^(?:(A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))$/i.test(value)) ? 'Invalid state' : undefined;
const isValidYear = value => value.length < 4 ? 'Invalid Year' : undefined;
const isValidZip = value => !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(value) && value.length !== 5 ? 'Invalid zip code' : undefined;
const maxLength = max => value => value && value.length > max ? `Must be ${max} characters or less!` : undefined;
const maxLength50 = maxLength(50);
const minPassword = value => (value.length <= 5) ? 'Password must be longer than 6 characters!' : null
const missingInput = value => (value === "<p><br></p>") ? 'You must include a message!' : null;

export {
  allowedCharacters,
  hasDates,
  isFloat,
  isNotEmpty,
  isNumber,
  isRequired,
  isSelected,
  isValidCC,
  isValidCVV,
  isValidEmail,
  isValidExpMonth,
  isValidPhone,
  isValidState,
  isValidYear,
  isValidZip,
  maxLength,
  maxLength50,
  minPassword,
  missingInput
}
