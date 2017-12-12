import { isRequired, isValidEmail } from './validateFormFields';

export default [
	{
		name: 'email',
		type: 'text',
		label: 'Email',
		validateFields: [isRequired, isValidEmail]
	}
];
