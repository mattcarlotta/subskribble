import { isRequired, isValidEmail, minPassword } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'company',
		type: 'text',
		component: AntInput,
		label: 'Company or Organization Name',
		validateFields: [isRequired]
	},
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
		validateFields: [isRequired, minPassword]
	}
];
