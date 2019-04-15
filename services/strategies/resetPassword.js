import bcrypt from 'bcrypt';
import { Strategy as LocalStrategy } from 'passport-local';
import passport from 'passport';
import db from 'db';
import { findUserByToken, updateUserPassword } from 'queries';
import { invalidToken, notUniquePassword } from 'authErrors';

export default () => passport.use(
  'reset-password',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true, // allows us to send request to the callback
    },
    async (req, email, password, done) => {
      try {
        await db.task('reset-password', async (dbtask) => {
          // check to see if email exists in the db
          const existingUser = await dbtask.oneOrNone(findUserByToken, [
            req.query.token,
          ]);
          if (!existingUser) return done(invalidToken, false);

          // compare newpassword to existingUser password
          const validPassword = await bcrypt.compare(
            password,
            existingUser.password,
          );
          if (validPassword) return done(notUniquePassword, false);

          // hash password before attempting to create the user
          const newPassword = await bcrypt.hash(password, 12);
          // update user's password
          await dbtask.none(updateUserPassword, [
            existingUser.id,
            newPassword,
          ]);

          return done(null, existingUser.email);
        });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
