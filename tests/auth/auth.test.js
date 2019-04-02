module.exports = (app) => {
  const request = app.get('request');
  const {
    db,
    query: { createNewUser, verifyEmail },
  } = app.database;
  const { currentDate, createRandomToken } = app.shared.helpers;
  const { mailer } = app.services;
  const {
    badCredentials,
    companyAlreadyExists,
    emailAlreadyTaken,
    invalidPassword,
    invalidToken,
    missingCredentials,
    missingToken,
    notUniquePassword,
  } = app.shared.authErrors;
  const {
    passwordResetSuccess,
    // passwordResetToken,
    // removedAccountSuccess,
    // thanksForReg,
    // updatedAccount,
    // updatedAccountDetails
  } = app.shared.authSuccess;
  const bcrypt = app.get('bcrypt');

  const signupProps = {
    company: 'Test',
    firstName: 'test',
    lastName: 'test',
    email: 'carlotta.matt@gmail.com',
    password: 'password',
  };

  const signinProps = {
    email: 'betatester@subskribble.com',
    password: 'password123',
  };

  const signUp = async () => {
    await request(app)
      .post('/api/signup')
      .send(signupProps)
      .expect(201);
  };

  const token = createRandomToken();
  const email = 'betatester@subskribble.com';

  const seedUser = async () => {
    const newPassword = await bcrypt.hash('password123', 12);
    await db.none(createNewUser, [
      email,
      newPassword,
      'Beta',
      'Tester',
      'Subskribble',
      token,
      `${currentDate()}`,
    ]);
    await db.none(verifyEmail, [email]);
  };

  let cookies;

  const signIn = async () => {
    await request(app)
      .post('/api/signin')
      .send(signinProps)
      .expect(201)
      .then((res) => {
        cookies = res.header['set-cookie'];
      });
  };

  describe('Auth Routes and Controllers', () => {
    beforeEach(async () => {
      cookies = null;
      await db.none('TRUNCATE users CASCADE');
    });

    afterEach(async () => {
      await db.none('TRUNCATE users CASCADE');
    });

    describe('Sign Up', () => {
      beforeEach(async () => {
        await signUp();
      });

      it('handles invalid signup requests', async () => {
        // missing signupProps
        await request(app)
          .post('/api/signup')
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(missingCredentials);
          });

        // email already exists
        await request(app)
          .post('/api/signup')
          .send(signupProps)
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(emailAlreadyTaken);
          });

        // company name already exists
        await request(app)
          .post('/api/signup')
          .send({ ...signupProps, email: 'test@test.com' })
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(companyAlreadyExists);
          });
      });

      it('handles valid signup requests and sends out an email', () => {
        expect(mailer.send).toHaveBeenCalled();
      });
    });

    describe('Sign In', () => {
      it('handles invalid sign in requests', async () => {
        await request(app)
          .post('/api/signin')
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(badCredentials);
          });
      });

      it('handles valid sign in requests', async () => {
        await seedUser();
        await signIn();
      });
    });

    describe('Logged In', () => {
      it('handles expired logged in session requests', async () => {
        await request(app)
          .get('/api/loggedin')
          .expect(200);
      });

      it('handles valid logged in session requests', async () => {
        await seedUser();
        await signIn();
        await request(app)
          .get('/api/loggedin')
          .set('Cookie', cookies)
          .expect(201);
      });
    });

    describe('Log out', () => {
      it('handles log out session requests', async () => {
        await seedUser();
        await signIn();
        await request(app)
          .post('/api/logout')
          .set('Cookie', cookies)
          .expect(200)
          .then((res) => {
            expect(res.text).toBe('Cookie deleted.');
          });
      });
    });

    describe('Reset Password', () => {
      it('handles invalid reset password requests', async () => {
        // missing token
        await request(app)
          .put('/api/reset-password/verify')
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(missingToken);
          });

        // missing email and/or password
        await request(app)
          .put(`/api/reset-password/verify?token=${createRandomToken()}`)
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(invalidPassword);
          });

        // invalid token
        await request(app)
          .put(`/api/reset-password/verify?token=${createRandomToken()}`)
          .send({ email, password: 'newpassword' })
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(invalidToken);
          });

        // password is the same
        await seedUser();
        await request(app)
          .put(`/api/reset-password/verify?token=${token}`)
          .send({ email, password: 'password123' })
          .then((res) => {
            expect(res.statusCode).toEqual(500);
            expect(res.body.err).toEqual(notUniquePassword);
          });
      });

      it('handles valid reset password requests', async () => {
        await seedUser();
        await request(app)
          .put(`/api/reset-password/verify?token=${token}`)
          .send({ email, password: 'newpassword' })
          .expect(201)
          .then((res) => {
            expect(res.body.message).toBe(
              passwordResetSuccess('betatester@subskribble.com'),
            );
          });
      });
    });
  });
};
