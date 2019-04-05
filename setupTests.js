jest.mock('@sendgrid/mail');

global.getCookie = require('./utils/getCookie');
global.db = require('./database/db');
global.app = require('./utils/request');
