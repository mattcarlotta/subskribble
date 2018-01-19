import { isRequired, isValidEmail, maxLength2000 } from './validateFormFields';
import { AntInput, AntTextArea } from './antReduxFormFields';

export default [
	{
		name: 'name',
		type: 'text',
    component: AntInput,
		label: 'Full Name',
		validateFields: [isRequired]
	},
	{
		name: 'email',
		type: 'email',
    component: AntInput,
		label: 'Email',
		validateFields: [isRequired, isValidEmail]
	},
	{
		name: 'message',
		type: 'text',
    component: AntTextArea,
		label: 'Message',
		style: { height: 200, resize: 'none' },
		validateFields: [isRequired, maxLength2000 ]
	}
];
