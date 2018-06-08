import React, { Component } from 'react';
import ReactQuill from 'react-quill';
import { Field } from 'redux-form';

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
  render = () => (
    <div className="editor-container">
      <ReactQuill
        formats={formats}
        onChange={this.props.handleChange}
        placeholder="Write something..."
        modules={modules}
        value={this.props.text}
        theme="snow"
      />
    </div>
  )
}
