import { isRequired, isValidEmail } from './validateFormFields';
import { AntInput } from './antReduxFormFields';

export default [
	{
		name: 'email',
		type: 'text',
		component: AntInput,
		placeholder: 'Email',
		validate: [isRequired, isValidEmail]
	}
];
