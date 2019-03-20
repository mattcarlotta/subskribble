import {
  isRequired,
  isValidEmail,
} from 'containers/app/formFields/validateFormFields.js';
import { AntInput } from 'containers/app/formFields/antReduxFormFields.js';

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
