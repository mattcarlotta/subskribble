import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { checkProps, mountWrap, shallowWrap } from './tests/utils';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });
global.fetch = require('jest-fetch-mock');

const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
global.shallow = shallowWrap;
global.mount = mountWrap;
global.checkProps = checkProps;
global.React = require('react');
global.LocaleProvider = require('antd').LocaleProvider;
global.enUS = require('antd/lib/locale-provider/en_US');
global.Provider = require('react-redux').Provider;
global.browserHistory = require('react-router').browserHistory;
global.Router = require('react-router').Router;
global.Route = require('react-router').Route;
global.store = require('./root/root.js').store;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js',
};
