import { isRequired, isValidEmail, minPassword } from './validateFormFields';

export default [
	// {
	// 	name: 'company',
	// 	type: 'text',
	// 	component: AntInput,
	// 	placeholder: 'Company or Organization Name',
	// 	validate: [isRequired]
	// },
	{
		name: 'firstName',
		type: 'text',
		placeholder: 'First Name',
		validate: [isRequired]
	},
	{
		name: 'lastName',
		type: 'text',
		placeholder: 'Last Name',
		validate: [isRequired]
	},
	{
		name: 'email',
		type: 'email',
		placeholder: 'Email',
		validate: [isRequired, isValidEmail]
	},
	{
		name: 'password',
		type: 'password',
		placeholder: 'Password',
		validate: [isRequired, minPassword]
	}
];
