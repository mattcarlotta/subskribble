import bcrypt from "bcrypt";
import passport from "passport";
import isEmpty from "lodash/isEmpty";
import mailer from "@sendgrid/mail";
import db from "db";
import { changedEmail } from "emailTemplates";
import config from "env";
import {
  deleteUserAccount,
  getAvatarToken,
  getCurrentUserDetails,
  getUserPassword,
  findCompany,
  findUserByToken,
  findUserByEmail,
  updateCompanyName,
  updateEmailAddress,
  updateSidebarState,
  updateUserName,
  updateUserPassword,
  userFeedback,
  verifyEmail,
} from "queries";
import {
  badCredentials,
  companyAlreadyExists,
  emailAlreadyTaken,
  invalidPassword,
  invalidToken,
  missingCredentials,
  missingEmailCreds,
  missingSidebarState,
  missingToken,
  notUniquePassword,
  unableLocatePass,
  unableToRemove,
} from "authErrors";
import {
  passwordResetSuccess,
  passwordResetToken,
  removedAccountSuccess,
  thanksForReg,
  updatedAccount,
  updatedAccountDetails,
} from "authSuccess";
import { sendError, createRandomToken } from "helpers";
import { missingDeletionParams, missingUpdateParams } from "errors";

const env = process.env.NODE_ENV;
const { portal } = config[env];

// CREATES A NEW USER
const create = (req, res, done) => {
  const {
    email, password, firstName, lastName, company,
  } = req.body;

  if (!email || !password || !firstName || !lastName || !company) {
    return sendError(missingCredentials, res, done);
  }

  passport.authenticate("local-signup", err => (err
    ? sendError(err, res, done)
    : res
      .status(201)
      .json(
        thanksForReg(req.body.email, req.body.firstName, req.body.lastName),
      )))(req, res, done);
};

// DELETES USER ACCOUNT
const deleteAccount = async (req, res, done) => {
  const {
    company, reason, password: suppliedPassword, user: email,
  } = req.body;
  if (!company || !suppliedPassword || !email) {
    return sendError(missingDeletionParams, res, done);
  }

  try {
    await db.task("delete-account", async (dbtask) => {
      const user = await dbtask.oneOrNone(getUserPassword, [req.session.id]);
      if (!user) return sendError(unableLocatePass, res, done);

      const validPassword = await bcrypt.compare(
        suppliedPassword,
        user.password,
      );
      if (!validPassword) return sendError(invalidPassword, res, done);

      const avatar = await dbtask.oneOrNone(getAvatarToken, [req.session.id]);

      const deletedUser = await dbtask.result(deleteUserAccount, [
        req.session.id,
        email,
        company,
      ]);
      if (!deletedUser) return sendError(unableToRemove, res, done);

      await dbtask.none(userFeedback, [company, email, reason]);

      res.status(202).json({ ...avatar, message: removedAccountSuccess });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// ALLOWS A USER TO LOG INTO THE APP
const login = (req, res, done) => {
  const { email, password } = req.body;
  if (!email || !password) return sendError(badCredentials, res, done);

  passport.authenticate("local-login", err => (err || !req.session || isEmpty(req.session)
    ? sendError(err || badCredentials, res, done)
    : res.status(201).json({ ...req.session })))(req, res, done);
};

// ALLOWS A USER TO LOG INTO THE APP ON REFRESH
const loggedin = (req, res, done) => (!req.session || isEmpty(req.session)
  ? sendError(badCredentials, res, done)
  : res.status(201).json({ ...req.session }));

// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
const logout = (req, res) => {
  req.session = null;
  res
    .clearCookie("Authorization", { path: "/" })
    .status(200)
    .send("Cookie deleted.");
};

// ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
const resetPassword = (req, res, done) => {
  const { token } = req.query;
  if (!token) return sendError(missingToken, res, done);

  const { email, password } = req.body;
  if (!email || !password) return sendError(invalidPassword, res, done);

  passport.authenticate("reset-password", (err, existingEmail) => (err || !existingEmail
    ? sendError(err || "No user found!", res, done)
    : res.status(201).json({ message: passwordResetSuccess(existingEmail) })))(req, res, done);
};

// EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
const resetToken = (req, res, done) => {
  const { email } = req.body;
  if (!email) return sendError(missingEmailCreds, res, done);

  passport.authenticate("reset-token", (err, existingEmail) => (err || !existingEmail
    ? sendError(err || "No user found!", res, done)
    : res.status(201).json(passwordResetToken(email))))(req, res, done);
};

// SAVES THE SIDEBAR STATE (COLLAPSED OR VISIBLE);
const saveSidebarState = async (req, res, done) => {
  const { collapseSideNav } = req.query;
  if (!collapseSideNav) return sendError(missingSidebarState, res, done);

  const { id } = req.session;
  const updatedSidebarState = !!collapseSideNav;

  try {
    await db.none(updateSidebarState, [id, updatedSidebarState]);
    req.session.collapsesidenav = updatedSidebarState;

    res.status(201).json({ collapseSideNav: updatedSidebarState });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// UPDATES USER ACCOUNT DETAILS (company, email, name, password)
const updateAccount = async (req, res, done) => {
  const {
    company: updatedCompany,
    email: updatedEmail,
    firstName: updatedFirstName,
    lastName: updatedLastName,
    currentPassword: suppliedPassword,
    updatedPassword,
  } = req.body;
  if (
    !updatedCompany
    || !updatedEmail
    || !updatedFirstName
    || !updatedLastName
    || !suppliedPassword
  ) return sendError(missingUpdateParams, res, done);

  const token = createRandomToken();

  const user = await db.oneOrNone(getUserPassword, [req.session.id]);
  if (!user) return sendError(unableLocatePass, res, done);

  try {
    await db.task("update-account", async (dbtask) => {
      const {
        email: currentEmail,
        company: currentCompany,
        firstname: currentFirstName,
        lastname: currentLastName,
      } = await dbtask.one(getCurrentUserDetails, [req.session.id]);

      const validPassword = await bcrypt.compare(
        suppliedPassword,
        user.password,
      );
      if (!validPassword) return sendError(invalidPassword, res, done);

      if (currentCompany !== updatedCompany) {
        const existingCompany = await dbtask.oneOrNone(findCompany, [
          updatedCompany,
        ]);
        if (existingCompany) return sendError(companyAlreadyExists, res, done);

        await dbtask.none(updateCompanyName, [req.session.id, updatedCompany]);

        req.session.company = updatedCompany;
      }

      if (
        currentFirstName !== updatedFirstName
        || currentLastName !== updatedLastName
      ) {
        await dbtask.none(updateUserName, [
          req.session.id,
          updatedFirstName,
          updatedLastName,
        ]);

        req.session.firstname = updatedFirstName;
        req.session.lastname = updatedLastName;
      }

      if (updatedPassword) {
        const isNotUniquePassword = await bcrypt.compare(
          updatedPassword,
          user.password,
        );
        if (isNotUniquePassword) return sendError(notUniquePassword, res, done);

        const newPassword = await bcrypt.hash(updatedPassword, 12);
        await dbtask.none(updateUserPassword, [req.session.id, newPassword]);
      }

      if (currentEmail !== updatedEmail) {
        const existingUser = await dbtask.oneOrNone(findUserByEmail, [
          updatedEmail,
        ]);
        if (existingUser) return sendError(emailAlreadyTaken, res, done);

        await dbtask.none(updateEmailAddress, [
          req.session.id,
          updatedEmail,
          token,
        ]);

        const msg = {
          to: `${updatedEmail}`,
          from: "helpdesk@subskribble.com",
          subject: "Please verify your email address",
          html: changedEmail(
            portal,
            req.session.firstname,
            req.session.lastname,
            token,
          ),
        };

        await mailer.send(msg);

        res.status(201).json({ message: updatedAccount });
      } else {
        res.status(201).json({
          user: !updatedPassword ? { ...req.session } : "",
          fetchnotifications: !updatedPassword,
          message: !updatedPassword
            ? updatedAccountDetails
            : passwordResetSuccess(updatedEmail),
        });
      }
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

// VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
const verifyAccount = async (req, res, done) => {
  const { token } = req.query;
  if (!token) return sendError(missingToken, res, done);

  try {
    await db.task("verify-email", async (dbtask) => {
      const existingUser = await dbtask.oneOrNone(findUserByToken, [token]);
      if (!existingUser) {
        return sendError(invalidToken, res, done);
      }
      if (existingUser.verified) {
        return res.status(201).json({ email: existingUser.email });
      }

      await dbtask.none(verifyEmail, [existingUser.email]);

      res.status(201).json({ email: existingUser.email });
    });
  } catch (err) {
    return sendError(err, res, done);
  }
};

export {
  create,
  deleteAccount,
  login,
  loggedin,
  logout,
  resetPassword,
  resetToken,
  saveSidebarState,
  updateAccount,
  verifyAccount,
};
