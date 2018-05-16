import React from 'react';
import { render } from 'react-dom';
import App from './root';
import './styles/styles.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'jquery/src/jquery';
// import $ from 'jquery';
// window.$ = $;


render(<App />, document.getElementById('root'));
