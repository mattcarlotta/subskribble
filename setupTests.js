import db from 'db';
import getCookie from 'utils/getCookie';
import app from 'utils/setup';

jest.mock('@sendgrid/mail');

expect.extend({
  toBeNullOrType: (received, type) => ({
    message: () => `expected ${received} to be null or ${type}`,
    pass: received === null || typeof received === type,
  }),
});

global.getCookie = getCookie;
global.db = db;
global.app = app;
