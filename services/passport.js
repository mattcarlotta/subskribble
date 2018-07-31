module.exports = app => {
	const passport = app.get("passport");

	require('./strategies/localSignup');
	require('./strategies/localLogin');
	require('./strategies/requireLogin')
	require('./strategies/resetToken');
	require('./strategies/resetPassword');
}
