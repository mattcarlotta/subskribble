import { isRequired, isValidEmail } from './validateFormFields';

export default [
  {
    disabled: true,
    name: 'processor',
    type: 'text',
    placeholder: 'Processor',
  },
  {
    disabled: true,
    name: 'planname',
    type: 'text',
    placeholder: 'Plan',
    validate: [isRequired],
  },
  {
    disabled: true,
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    validate: [isRequired, isValidEmail],
  },
  {
    disabled: true,
    name: 'subscriber',
    type: 'text',
    placeholder: 'Subscriber',
    validate: [isRequired],
  },
];
