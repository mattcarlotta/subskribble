import { isRequired, isValidEmail } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'email',
		type: 'text',
		component: AntInput,
		label: 'Email',
		validateFields: [isRequired, isValidEmail]
	},
	{
		name: 'password',
		type: 'password',
		component: AntInput,
		label: 'Password',
		validateFields: [isRequired]
	}
];
