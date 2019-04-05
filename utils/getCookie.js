const app = require('./request');

module.exports = async (suppliedEmail, suppliedPassword) => {
  let cookie;
  await app()
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
