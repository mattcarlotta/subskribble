import {
  allowedCharacters,
  isRequired,
  isValidEmail,
  maxLength2000,
} from './validateFormFields';
import { AntInput, AntTextArea } from './antReduxFormFields';

export default [
  {
    name: 'name',
    type: 'text',
    component: AntInput,
    placeholder: 'Full Name',
    validate: [isRequired, allowedCharacters],
  },
  {
    name: 'email',
    type: 'email',
    component: AntInput,
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
  {
    name: 'message',
    type: 'text',
    component: AntTextArea,
    placeholder: 'Message',
    style: { height: 200, resize: 'none' },
    validate: [isRequired, maxLength2000],
  },
];
