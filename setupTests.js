jest.mock('@sendgrid/mail');

expect.extend({
  toBeNullOrType(received, type) {
    const pass = !!(received === null || typeof received === 'string');
    return {
      message: () => `expected ${received} to be null or ${type}`,
      pass,
    };
  },
});

global.getCookie = require('./utils/getCookie');
global.db = require('./database/db');
global.app = require('./utils/request');
