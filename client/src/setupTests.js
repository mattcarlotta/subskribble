import { JSDOM } from 'jsdom';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { createStoreFactory, mountWrap, shallowWrap } from './tests/utils';
import { mockApp, mockAPI } from './tests/mocks/axios';

configure({ adapter: new Adapter(), disableLifecycleMethods: true });

/*
THE BELOW ARE ACCESSIBLE AND PREDEFINED FOR ALL *.TEST.JS FILES
WARNING: Due to the below being accessible to the global DOM,
         all *.test.js files will have custom rules for ESLint.
         Otherwise, ESLint will throw errors that the functions/
         modules are undefined because they are not explictly
         imported! See "overrides" in ".eslintrc" for more
         information.
*/
const exposedProperties = ['window', 'navigator', 'document'];
const { document } = new JSDOM('').window;
global.document = document;
global.window = document.defaultView;
global.HTMLElement = window.HTMLElement;
global.HTMLAnchorElement = window.HTMLAnchorElement;
global.mockApp = mockApp;
global.mockAPI = mockAPI;
global.createStoreFactory = createStoreFactory;
global.shallow = shallowWrap;
global.mount = mountWrap;
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
