module.exports = (app) => {
  const request = app.get('request');
  const { db } = app.database;
  const { mailer } = app.services;

  const signupProps = {
    company: 'Test',
    firstName: 'test',
    lastName: 'test',
    email: 'carlotta.matt@gmail.com',
    password: 'password',
  };

  const signUp = async () => {
    await request(app)
      .post('/api/signup')
      .send(signupProps)
      .expect(201);
  };

  describe('Auth Routes and Controllers', () => {
    beforeEach(async () => {
      await db.none('TRUNCATE users CASCADE');
    });

    describe('Sign Up', () => {
      it('handles invalid signup requests', async () => {
        await request(app)
          .post('/api/signup')
          .expect(500)
          .then((err) => {
            expect(err.statusCode).toEqual(500);
            expect(err.body.err).toEqual(
              'You must supply a valid first name, last name, email, password and company name in order to sign up.',
            );
          });

        await signUp();

        await request(app)
          .post('/api/signup')
          .send(signupProps)
          .then((err) => {
            expect(err.statusCode).toEqual(500);
            expect(err.body.err).toEqual(
              'That email is already in use and is associated with an active account.',
            );
          });

        await request(app)
          .post('/api/signup')
          .send({ ...signupProps, email: 'test@test.com' })
          .then((err) => {
            expect(err.statusCode).toEqual(500);
            expect(err.body.err).toEqual(
              'That company has already been registered and is associated with an active account.',
            );
          });
      });

      it('handles valid signup requests and sends out an email', async () => {
        await signUp();
        expect(mailer.send).toHaveBeenCalled();
      });
    });
  });
};
