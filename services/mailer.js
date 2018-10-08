const sgMail = require('@sendgrid/mail');

module.exports = app => {
	const sendgridAPIKey = app.get("sendgridAPIKey");
	sgMail.setApiKey(sendgridAPIKey);

	return sgMail;
}
