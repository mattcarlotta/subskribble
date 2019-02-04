import {
  isRequired,
  isValidEmail,
} from '../../app/formFields/validateFormFields.js';
import { AntInput } from '../../app/formFields/antReduxFormFields.js';

export default [
  {
    name: 'email',
    type: 'email',
    component: AntInput,
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
  {
    name: 'password',
    type: 'password',
    component: AntInput,
    placeholder: 'Password',
    validate: [isRequired],
  },
];
