const express = require('express');

const app = express();
const consign = require('consign');

jest.mock('./services/mailer.js', () => ({
  send: jest.fn(),
}));

consign({ cwd: process.cwd(), locale: 'en-us', verbose: false })
  .include('middlewares')
  .then('database')
  .then('shared')
  .then('services')
  .then('controllers')
  .then('routes')
  .then('tests')
  .into(app);
