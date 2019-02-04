import {
  isRequired,
  isValidEmail,
} from '../../app/formFields/validateFormFields.js';
import { AntInput } from '../../app/formFields/antReduxFormFields.js';

export default [
  {
    name: 'email',
    type: 'text',
    component: AntInput,
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
];
