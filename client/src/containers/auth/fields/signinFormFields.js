import { isRequired, isValidEmail } from '../../forms/validateFormFields';

export default [
	{
		name: 'email',
		type: 'text',
		label: 'Email',
		validateFields: [isRequired, isValidEmail]
	},
	{
		name: 'password',
		type: 'password',
		label: 'Password',
		validateFields: [isRequired]
	}
];
