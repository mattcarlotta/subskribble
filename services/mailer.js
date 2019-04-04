const sgMail = require('@sendgrid/mail');
const config = require('../env');

const env = process.env.NODE_ENV;
const { sendgridAPIKey } = config[env];

module.exports = sgMail.setApiKey(sendgridAPIKey);
