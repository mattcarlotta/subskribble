const express = require('express');

const app = express();
const consign = require('consign');

consign({ locale: 'en-us', verbose: false })
  .include('middlewares')
  .then('shared')
  .then('database')
  .then('seeds')
  .into(app);
