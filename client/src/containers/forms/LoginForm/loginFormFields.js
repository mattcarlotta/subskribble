import {
  isRequired,
  isValidEmail,
} from '../../app/formFields/validateFormFields';
import { AntInput } from '../../app/formFields/antReduxFormFields';

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
