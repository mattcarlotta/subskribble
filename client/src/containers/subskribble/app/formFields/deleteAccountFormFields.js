import { allowedCharacters, isRequired, minPassword } from './validateFormFields';

export default [
  {
    disabled: true,
    label: 'Company',
		name: 'company',
		type: 'text',
		placeholder: 'Company'
	},
  {
    label: 'Current Password',
    name: 'currentPassword',
    type: 'password',
    placeholder: 'Current Password',
    validate: [isRequired, minPassword]
  },
	{
    label: 'Reason',
		name: 'reason',
		type: 'text',
		placeholder: 'Tell us why (optional)',
		validate: [allowedCharacters]
	}
];
