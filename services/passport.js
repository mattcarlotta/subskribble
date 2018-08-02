module.exports = app => {
	require('./strategies/localSignup');
	require('./strategies/localLogin');
	require('./strategies/requireLogin')
	require('./strategies/resetToken');
	require('./strategies/resetPassword');
}
