import { isRequired, isValidEmail, minPassword } from '../../forms/validateFormFields';

export default [
	{
		name: 'company',
		type: 'text',
		label: 'Company or Organization Name',
		validateFields: [isRequired]
	},
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
		validateFields: [isRequired, minPassword]
	}
];
