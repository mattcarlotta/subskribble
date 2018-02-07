import { isRequired, isValidEmail } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'email',
		type: 'text',
		component: AntInput,
		label: 'Email',
		validateFields: [isRequired, isValidEmail]
	}
];
