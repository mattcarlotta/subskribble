module.exports = {
  passwordReset: email => ({ message: `Password has been reset for ${email}. Please login into your account again.` }),
  passwordResetSuccess: email => ({ message: `Password has been reset for ${email}. Please login into your account again.` }),
  passwordResetToken: email => ({ message: `Password reset confirmed. Please check ${email} for a reset link.` }),
  thanksForReg: (email, firstName, lastName) => ({ message: `Thank you for registering, ${firstName} ${lastName}. Please check ${email} for a verification link.` }),
  updatedAccount: () => ({ message: 'Successfully updated your account details. You must reverify your email address before logging into your account again.'})
};
