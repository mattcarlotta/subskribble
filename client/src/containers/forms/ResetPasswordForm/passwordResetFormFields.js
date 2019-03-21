import {
  isRequired,
  isValidEmail,
} from 'containers/app/formFields/validateFormFields.js';
import { AntInput } from 'containers/app/formFields/antReduxFormFields.js';

export default [
  {
    name: 'email',
    type: 'text',
    component: AntInput,
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
];
