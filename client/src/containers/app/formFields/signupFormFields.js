import {
  allowedCharacters,
  isRequired,
  isValidEmail,
  minPassword,
} from './validateFormFields';

export default [
  {
    name: 'company',
    type: 'text',
    placeholder: 'Company',
    validate: [isRequired, allowedCharacters],
  },
  {
    name: 'firstName',
    type: 'text',
    placeholder: 'First Name',
    validate: [isRequired, allowedCharacters],
  },
  {
    name: 'lastName',
    type: 'text',
    placeholder: 'Last Name',
    validate: [isRequired, allowedCharacters],
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    validate: [isRequired, minPassword],
  },
];
