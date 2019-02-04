import {
  allowedCharacters,
  isRequired,
  isValidEmail,
  minPassword,
} from '../../app/formFields/validateFormFields.js';

export default [
  {
    label: 'Company',
    name: 'company',
    type: 'text',
    placeholder: 'Company',
    validate: [isRequired, allowedCharacters],
  },
  {
    label: 'First Name',
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    validate: [isRequired, allowedCharacters],
  },
  {
    label: 'Last Name',
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    validate: [isRequired, allowedCharacters],
  },
  {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
  {
    label: 'Current Password',
    name: 'currentPassword',
    type: 'password',
    placeholder: 'Current Password (leave empty if no change)',
    validate: [minPassword],
  },
  {
    label: 'New Password',
    name: 'updatedPassword',
    type: 'password',
    placeholder: 'New Password (leave empty if no change)',
    validate: [minPassword],
  },
];
