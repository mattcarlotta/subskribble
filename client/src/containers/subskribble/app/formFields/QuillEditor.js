import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Field } from 'redux-form';
import RenderFormErrors from './renderFormErrors';
import { isRequired, missingInput } from './validateFormFields';

const modules = {
	toolbar: [
		[{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
		[{size: []}],
		['bold', 'italic', 'underline', 'strike', 'blockquote'],
		[{'list': 'ordered'}, {'list': 'bullet'},
		 {'indent': '-1'}, {'indent': '+1'}],
		['link', 'image', 'video'],
		['clean']
	],
	clipboard: {
		// toggle to add extra line breaks when pasting HTML:
		matchVisual: false,
	}
}

const formats = [
	'header', 'font', 'size',
	'bold', 'italic', 'underline', 'strike', 'blockquote',
	'list', 'bullet', 'indent',
	'link', 'image', 'video'
]

export default class QuillEditor extends Component {
	renderEditor = ({ input, meta: { touched, error } }) => (
		<div className={(touched && error) ? 'has-error' : null }>
			<ReactQuill
				{...input}
				formats={formats}
				onChange={(newValue, delta, source) => (source === 'user') ? input.onChange(newValue) : null }
				onBlur={(range, source, quill) => input.onBlur(quill.getHTML()) }
				placeholder="Write something..."
				modules={modules}
				theme="snow"
			/>
			<RenderFormErrors error={error} touched={touched} />
		</div>
	)

	render = () => (
		<div className="editor-container">
			<Field
				name="message"
				component={this.renderEditor}
				validate={[isRequired, missingInput]}
			/>
		</div>
	)
}
