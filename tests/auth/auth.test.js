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
    missingEmailCreds,
    missingCredentials,
    missingSidebarState,
    missingToken,
    notUniquePassword,
  } = app.shared.authErrors;
  const {
    passwordResetSuccess,
    passwordResetToken,
    removedAccountSuccess,
    updatedAccount,
    updatedAccountDetails,
  } = app.shared.authSuccess;
  const { missingDeletionParams, missingUpdateParams } = app.shared.errors;
  const bcrypt = app.get('bcrypt');

  const signupProps = {
    company: 'Test',
    firstName: 'test',
    lastName: 'test',
    email: 'betatester@subskribble.com',
    password: 'password',
  };

  const updateAccProps = {
    company: 'Test 2',
    firstName: 'test 2',
    lastName: 'test 2',
    email: 'betatester@subskribble.com',
    currentPassword: 'password123',
  };

  const updateAccPropsExceptEmail = {
    ...updateAccProps,
    updatedPassword: 'newpassword',
  };

  const updateEmailAccProps = {
    company: 'Test',
    firstName: 'test',
    lastName: 'test',
    email: 'carlotta.matt@gmail.com',
    currentPassword: 'password123',
    updatedPassword: 'newpassword',
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
      await db.none('TRUNCATE feedback RESTART IDENTITY');
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
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingCredentials);
          });

        // email already exists
        await request(app)
          .post('/api/signup')
          .send(signupProps)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(emailAlreadyTaken);
          });

        // company name already exists
        await request(app)
          .post('/api/signup')
          .send({ ...signupProps, email: 'test@test.com' })
          .then((res) => {
            expect(res.statusCode).toEqual(400);
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
            expect(res.statusCode).toEqual(400);
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
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid reset password requests', async () => {
        // missing token
        await request(app)
          .put('/api/reset-password/verify')
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingToken);
          });

        // missing email and/or password
        await request(app)
          .put(`/api/reset-password/verify?token=${createRandomToken()}`)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(invalidPassword);
          });

        // invalid token
        await request(app)
          .put(`/api/reset-password/verify?token=${createRandomToken()}`)
          .send({ email, password: 'newpassword' })
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(invalidToken);
          });

        // password is the same
        await request(app)
          .put(`/api/reset-password/verify?token=${token}`)
          .send({ email, password: 'password123' })
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(notUniquePassword);
          });
      });

      it('handles valid reset password requests', async () => {
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

    describe('Reset Token', () => {
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid reset token requests', async () => {
        // missing email creds
        await request(app)
          .put('/api/reset-token')
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingEmailCreds);
          });

        // invalid email creds
        await request(app)
          .put('/api/reset-token')
          .send({ email: 'test@test.com', password: 'reset-token' })
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingEmailCreds);
          });
      });

      it('handles valid reset token requests', async () => {
        await request(app)
          .put('/api/reset-token')
          .send({ email, password: 'reset-token' })
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(passwordResetToken(email));
            expect(mailer.send).toHaveBeenCalled();
          });
      });
    });

    describe('Sidebar State', () => {
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid sidebar save state requests', async () => {
        // not logged in
        await request(app)
          .put('/api/save-sidebar-state?')
          .then((res) => {
            expect(res.statusCode).toEqual(401);
            expect(res.body.err).toEqual(badCredentials);
          });

        // logged in but missing query
        await signIn();
        await request(app)
          .put('/api/save-sidebar-state?')
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingSidebarState);
          });
      });

      it('handles valid sidebar save state requests', async () => {
        await signIn();
        await request(app)
          .put('/api/save-sidebar-state?collapseSideNav=true')
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body.collapseSideNav).toBeTruthy();
          });
      });
    });

    describe('Update Account', () => {
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid update account requests', async () => {
        // not logged in
        await request(app)
          .put('/api/update-account')
          .then((res) => {
            expect(res.statusCode).toEqual(401);
            expect(res.body.err).toEqual(badCredentials);
          });

        // logged in but missing params
        await signIn();
        await request(app)
          .put('/api/update-account')
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingUpdateParams);
          });
      });

      it('handles valid company, firstName, and lastName update requests', async () => {
        await signIn();

        // updates company, first name and lastname
        await request(app)
          .put('/api/update-account')
          .send({ ...updateAccProps })
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body.user).toMatchObject({
              collapsesidenav: expect.any(Boolean),
              company: updateAccProps.company,
              email: updateAccProps.email,
              firstname: updateAccProps.firstName,
              lastname: updateAccProps.lastName,
              id: expect.any(String),
              isgod: false,
            });
            expect(res.body.fetchnotifications).toBeTruthy();
            expect(res.body.message).toEqual(updatedAccountDetails);
          });
      });

      it('handles valid password update requests', async () => {
        await signIn();

        // updates password (requires a relogin)
        await request(app)
          .put('/api/update-account')
          .send({ ...updateAccPropsExceptEmail })
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body.user).toEqual('');
            expect(res.body.fetchnotifications).toBeTruthy();
            expect(res.body.message).toEqual(
              passwordResetSuccess(updateAccProps.email),
            );
          });
      });

      it('handles valid email update requests', async () => {
        await signIn();

        // updates emails (requires reverification and relogin)
        await request(app)
          .put('/api/update-account')
          .send({ ...updateEmailAccProps })
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body.message).toEqual(updatedAccount);
          });
      });
    });

    describe('Email Verification', () => {
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid email verification requests', async () => {
        // missing token
        await request(app)
          .put('/api/email/verify?')
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingToken);
          });

        // invalid token
        await request(app)
          .put(`/api/email/verify?token=${createRandomToken()}`)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(invalidToken);
          });
      });

      it('handles valid email verification requests', async () => {
        await request(app)
          .put(`/api/email/verify?token=${token}`)
          .then((res) => {
            expect(res.statusCode).toEqual(201);
            expect(res.body.email).toEqual(signupProps.email);
          });
      });
    });

    describe('Delete Account', () => {
      beforeEach(async () => {
        await seedUser();
      });

      it('handles invalid delete account requests', async () => {
        // not logged in
        await request(app)
          .delete('/api/delete-account')
          .then((res) => {
            expect(res.statusCode).toEqual(401);
            expect(res.body.err).toEqual(badCredentials);
          });

        await signIn();

        // logged in but missing params
        await request(app)
          .delete('/api/delete-account')
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(missingDeletionParams);
          });

        // invalid supplied password
        await request(app)
          .delete('/api/delete-account')
          .send({
            company: 'Test',
            user: 'betatester@subskribble.com',
            password: 'invalidpassword',
          })
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(400);
            expect(res.body.err).toEqual(invalidPassword);
          });
      });

      it('handles valid delete account requests', async () => {
        await signIn();

        await request(app)
          .delete('/api/delete-account')
          .send({
            company: 'Test',
            user: 'betatester@subskribble.com',
            password: 'password123',
          })
          .set('Cookie', cookies)
          .then((res) => {
            expect(res.statusCode).toEqual(202);
            expect(res.body.message).toEqual(removedAccountSuccess);
          });
      });
    });
  });
};
