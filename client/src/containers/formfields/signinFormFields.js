import { isRequired, isValidEmail } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'email',
		type: 'email',
		component: AntInput,
		placeholder: 'Email',
		validate: [isRequired, isValidEmail]
	},
	{
		name: 'password',
		type: 'password',
		component: AntInput,
		placeholder: 'Password',
		validate: [isRequired]
	}
];
