import {
  isRequired,
  isValidEmail,
} from '../../app/formFields/validateFormFields';
import { AntInput } from '../../app/formFields/antReduxFormFields';

export default [
  {
    name: 'email',
    type: 'text',
    component: AntInput,
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
];
