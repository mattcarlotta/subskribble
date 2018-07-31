import { isRequired, minPassword } from './validateFormFields';

export default [
	{
		name: 'password',
		type: 'password',
		placeholder: 'New Password',
		validate: [isRequired, minPassword]
	}
]
