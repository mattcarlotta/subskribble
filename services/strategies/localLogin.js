import isEmpty from "lodash/isEmpty";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";
import passport from "passport";
import db from "db";
import { findUserByEmail, getUserDetails } from "queries";
import {
  alreadyLoggedIn,
  badCredentials,
  emailConfirmationReq,
} from "authErrors";

export default () => passport.use(
  "local-login",
  new LocalStrategy(
    {
      // override username with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      // if (!email || !password) return done(badCredentials, false);

      try {
        await db.task("local-login", async (dbtask) => {
          // check to see if user is logged in from another session
          if (!isEmpty(req.session)) return done(alreadyLoggedIn, false);

          // check to see if the user already exists
          const existingUser = await dbtask.oneOrNone(findUserByEmail, [
            email,
          ]);
          if (!existingUser) return done(badCredentials, false);
          if (!existingUser.verified) return done(emailConfirmationReq, false);

          // compare password to existingUser password
          const validPassword = await bcrypt.compare(
            password,
            existingUser.password,
          );
          if (!validPassword) return done(badCredentials, false);

          const founderUser = await dbtask.one(getUserDetails, [email]);
          req.session = { ...founderUser };

          return done(null, true);
        });
      } catch (err) {
        return done(err, false);
      }
    },
  ),
);
