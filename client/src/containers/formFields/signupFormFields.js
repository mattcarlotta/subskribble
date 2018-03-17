import { isRequired, isValidEmail, minPassword } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'company',
		type: 'text',
		component: AntInput,
		placeholder: 'Company or Organization Name',
		validate: [isRequired]
	},
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
		validate: [isRequired, minPassword]
	}
];
