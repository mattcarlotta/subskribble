import React from 'react';
import { render } from 'react-dom';
import App from './routes';
import './styles/styles.css';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import $ from 'jquery';
window.$ = $;


render(<App />, document.getElementById('rocketbiller'));
