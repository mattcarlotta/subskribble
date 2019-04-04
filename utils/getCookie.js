const request = require('supertest');
const app = require('./testApp');

module.exports = async (suppliedEmail, suppliedPassword) => {
  let cookie;
  await request(app)
    .post('/api/signin')
    .send({
      email: suppliedEmail,
      password: suppliedPassword,
    })
    .expect(201)
    .then((res) => {
      cookie = res.header['set-cookie'];
    });
  return cookie;
};
