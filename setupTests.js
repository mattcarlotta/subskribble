jest.mock('@sendgrid/mail');

global.app = require('./utils/testApp');
global.getCookie = require('./utils/getCookie');
global.db = require('./database/db');
global.request = require('supertest');
