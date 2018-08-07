module.exports = app => {
	const { db, query: {
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
		verifyEmail
	}} = app.database;
	const { sendError } = app.shared.helpers;
	const {
		badCredentials,
		companyAlreadyExists,
		emailAlreadyTaken,
		invalidToken,
		missingSidebarState,
		missingToken,
		notUniquePassword
	} = app.shared.authErrors;
	const { passwordReset, passwordResetSuccess, passwordResetToken, thanksForReg } = app.shared.authSuccess;
	const { createRandomToken } = app.shared.helpers;
	const { mailer, emailTemplates: { changedEmail } } = app.services;
	const bcrypt = app.get("bcrypt");
	const passport = app.get("passport");
	const portal = app.get("portal");

	return {
		// CREATES A NEW USER
		create: (req, res, done) => passport.authenticate('local-signup', err => {
			if (err) return sendError(err, res, done);
			res.status(201).json(thanksForReg(req.body.email, req.body.firstName, req.body.lastName))
		})(req, res, done),
		// ALLOWS A USER TO LOG INTO THE APP
		login: (req, res, done) => passport.authenticate('local-login', err => {
			if (err || !req.session) return sendError(err || badCredentials, res, done);
			res.status(201).json({ ...req.session });
		})(req, res, done),
		// ALLOWS A USER TO LOG INTO THE APP
		loggedin: (req, res) => {
			if (!req.session) return sendError(badCredentials, res, done);
			res.status(201).json({ ...req.session });
		},
		// REMOVES USER FROM SESSION AND DELETES CLIENT COOKIE
		logout: (req, res, done) => {
			if (!req.session.id) return sendError('Already logged out', res, done);
			req.session = null;
			res.clearCookie('Authorization', { path: '/' }).status(200).send('Cookie deleted.');
		},
		// ALLOWS A USER TO UPDATE THEIR PASSWORD WITH A TOKEN
		resetPassword: (req, res, done) => passport.authenticate('reset-password', (err, user) => {
			if (err || !user) return sendError(err || 'No user found!', res, done);
			res.status(201).json(passwordResetSuccess(user.email))
		})(req, res, done),
		// EMAILS A USER A TOKEN TO RESET THEIR PASSWORD
		resetToken: (req, res, done) => passport.authenticate('reset-token', (err, email) => {
			if (err || !email) return sendError(err || 'No user found!', res, done);
			res.status(201).json(passwordResetToken(email))
		})(req, res, done),
		// SAVES THE SIDEBAR STATE (COLLAPSED OR VISIBLE);
		saveSidebarState: async (req, res, done) => {
			if (!req.query) return sendError(missingSidebarState, res, done);
			const { collapseSideNav } = req.query;
			const updatedSidebarState = collapseSideNav === 'true' ? true : false;

			try {
				await db.none(updateSidebarState(), [req.session.id, updatedSidebarState]);
				req.session.collapsesidenav = updatedSidebarState;

				res.status(201).json({ collapseSideNav: updatedSidebarState });
			} catch (err) { return sendError(err, res, done) }
		},
		updateAccount: async(req, res, done) => {
			if (!req.body) return sendError('Missing account update parameters.', res, done);

			const {
				company: updatedCompany,
				email: updatedEmail,
				firstName: updatedFirstName,
				lastName: updatedLastName,
				currentPassword: suppliedCurrentPassword,
				updatedPassword
			} = req.body;

			try {
				const {
					email: currentEmail,
					company: currentCompany,
					firstname: currentFirstName,
					lastname: currentLastName
				} = await db.one(getCurrentUserDetails(), [req.session.id]);

				if (currentCompany !== updatedCompany) {
					// check to see if the company is already in use
					const existingCompany = await db.oneOrNone(findCompany(), [updatedCompany]);
					if (existingCompany) return sendError(companyAlreadyExists, res, done);
					// update the user account with new information
					await db.none(updateCompanyName(), [req.session.id, updatedCompany]);
					// update session to reflect change
					req.session.company = updatedCompany;
				}

				if (currentFirstName !== updatedFirstName || currentLastName !== updatedLastName) {
					// update the user account with new information
					await db.none(updateUserName(), [req.session.id, updatedFirstName, updatedLastName]);
					// update session to reflect change
					req.session.firstname = updatedFirstName;
					req.session.lastname = updatedLastName;
				}

				if (suppliedCurrentPassword || updatedPassword) {
					if (!suppliedCurrentPassword || !updatedPassword) return sendError('You must supply both your current password and a new password.', res, done);

					const { password } = await db.oneOrNone(getUserPassword(), [req.session.id]);

					const validPassword = await bcrypt.compare(suppliedCurrentPassword, password);
					console.log('validPassword', validPassword);
					if (!validPassword) return sendError("The current password you've supplied does not match our records. Please try again.", res, done);

					const isNotUniquePassword = await bcrypt.compare(updatedPassword, password);
					if (isNotUniquePassword) return sendError(notUniquePassword, res, done);

					try {
						// hash password before attempting to create the user
						const newPassword = await bcrypt.hash(updatedPassword, 12)
						// update user password
						await db.none(updateUserPassword(),[req.session.id, newPassword])
					} catch (err) { return sendError(err, res, done) }
				}

				// check if the email was changed
				if (currentEmail !== updatedEmail) {
					// check to see if the email is already in use
					const existingUser = await db.oneOrNone(findUserByEmail(), [updatedEmail]);
					if (existingUser) return sendError(emailAlreadyTaken, res, done);

					const token = createRandomToken(); // generate a token used for email verification
					// update email; set verified to false; update token;
					await db.none(updateEmailAddress(), [req.session.id, updatedEmail, token]);

					const msg = {
						to: `${updatedEmail}`,
						from: `helpdesk@subskribble.com`,
						subject: `Please verify your email address`,
						html: changedEmail(portal, req.session.firstname, req.session.lastname, token)
					}

					// send a new verification email to the updated user
					mailer.send(msg)
						.then(() => {
							res.status(201).json({
								message: 'Successfully updated your account details. You must reverify your email address before logging into your account again.'
							});
						})
						.catch(err => (sendError(err, res, done)))
				} else {
					// user only updated company/their name, so update session, and send loggedinUser details
					res.status(201).json({
						user: {...req.session },
						message: 'Successfully updated your account details.'
					});
				}
			} catch (err) { return sendError(err, res, done) }
		},
		// VERIFIES THE USER HAS A VALID EMAIL BEFORE GIVING LOGIN ACCESS
		verifyEmail: async (req, res, done) => {
			const { token } = req.query;
			if (!token) return sendError(missingToken, res, done);

			try {
				const existingUser = await db.oneOrNone(findUserByToken(), [token]); // check if token is valid
				if (!existingUser) return sendError(invalidToken, res, done)
				if (existingUser.verified) return res.status(201).json({ email: existingUser.email });

				await db.none(verifyEmail(), [existingUser.email]); // sets user to verification status to true

				res.status(201).json({ email: existingUser.email })
			} catch (err) { return sendError(err, res, done) }
		}
	}
}
