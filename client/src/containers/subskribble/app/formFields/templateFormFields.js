import { allowedCharacters, isRequired, isValidEmail } from './validateFormFields';

export default [
	{
		name: 'templatename',
		type: 'text',
		placeholder: 'Unique template name',
		validate: [isRequired, allowedCharacters]
	},
	{
		name: 'subject',
		type: 'text',
		placeholder: 'Subject',
		validate: [isRequired, allowedCharacters]
	},
	{
		name: 'fromsender',
		type: 'email',
		placeholder: 'From (email address)',
		validate: [isRequired, isValidEmail]
	}
]
