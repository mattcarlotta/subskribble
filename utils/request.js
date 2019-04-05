const request = require('supertest');
const app = require('./testApp');

module.exports = () => request(app);
