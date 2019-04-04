const express = require('express');

const app = express();

jest.mock('./services/mailer.js', () => ({
  send: jest.fn(),
}));

// jest.mock("./database/db", () => {
//   ...require.requireActual('pgp'),
//   one: (req) => new Promise(resolve, reject) => {
//     resolve();
//   }),
//   oneOrNone:  => new Promise(resolve, reject) => {
//     resolve();
//   }),
//   none: (req)  => new Promise(resolve, reject) => {
//     resolve();
//   }),
//   task: ()
// })

global.app = app;

require('./middlewares')(app);
require('./routes')(app);
