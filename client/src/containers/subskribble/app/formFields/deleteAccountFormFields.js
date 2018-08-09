import { allowedTextAreaCharacters, isRequired } from './validateFormFields';
import { AntTextArea } from './antReduxFormFields';

export default [
  {
    disabled: true,
    label: 'Company',
		name: 'company',
		type: 'text',
		placeholder: 'Company'
	},
  {
    disabled: true,
    label: 'User',
		name: 'user',
		type: 'text',
		placeholder: 'User'
	},
  {
    label: 'Current Password',
    name: 'password',
    type: 'password',
    placeholder: 'Current Password',
    validate: [isRequired]
  },
	{
    className: "textarea-container",
    component: AntTextArea,
    label: 'Reason',
		name: 'reason',
		type: 'text',
		placeholder: 'Tell us why you\'re deleting your account (optional)',
		validate: [allowedTextAreaCharacters],
    rows: 10,
    style: { resize: 'none' }
	}
];
