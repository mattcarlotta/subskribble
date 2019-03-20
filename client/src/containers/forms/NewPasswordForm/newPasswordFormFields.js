import {
  isRequired,
  minPassword,
} from 'containers/app/formFields/validateFormFields.js';

export default [
  {
    name: 'password',
    type: 'password',
    placeholder: 'New Password',
    validate: [isRequired, minPassword],
  },
];
