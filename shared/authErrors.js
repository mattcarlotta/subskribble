module.exports = app => (
  {
    badCredentials: 'There was a problem with your login credentials. Please make sure your username and password are correct.',
    emailAlreadyTaken: 'That email is already in use and is associated with an active account.',
    emailConfirmationReq: 'You must verify your email before attempting to do that.',
    invalidToken: 'There was a problem authenticating your request. The token that was supplied was invalid.',
    missingCredentials: 'You must supply a valid first name, last name, email and password in order to sign up.',
    missingEmailCreds: 'That email is not associated with an active account. Please make sure the email address is spelled correctly.',
    missingToken: 'There was a problem authenticating your request.',
    notUniquePassword: 'Your new password must not match the old password. Please try again.'
  }
)
