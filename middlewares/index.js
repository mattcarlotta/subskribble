const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const mailer = require('@sendgrid/mail');
const strategies = require('../services/strategies');
const config = require('../env');

const env = process.env.NODE_ENV;
const inTesting = env === 'test';
/* eslint-disable */
if (!inTesting) {
  const currentENV = () => {
    const envirnoment = config[env];
    const keys = Object.keys(envirnoment);
    const values = Object.values(envirnoment);

    let variables = '';
    for (let i = 0; i < keys.length; i += 1) {
      variables += `\x1b[33m• ${keys[i].toUpperCase()}\x1b[0m: ${
        values[i]
      } \n `;
    }
    return variables;
  };
  // eslint-disable-next-line no-console
  console.log(
    `\n[ \x1b[1m${env.toUpperCase()} ENVIRONMENT\x1b[0m ]\n ${currentENV()}`
  );

  if (env !== 'development') {
    // eslint-disable-next-line no-console
    console.log(
      `\n\x1b[1mYour application is running on: ${config[env].portal}\x1b[0m`
    );
  }
}
/* eslint enable */
//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
module.exports = app => {
  strategies();
  mailer.setApiKey(config[env].sendgridAPIKey);
  app.use(
    cors({
      credentials: true,
      origin: config[env].portal
    })
  ); // allows receiving of cookies from front-end
  if (!inTesting) app.use(morgan('tiny')); // logging framework
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(cookieParser()); // parses header cookies
  app.use(
    cookieSession({
      // sets up a cookie session as req.session ==> set in passport local login strategy
      name: 'Authorization',
      maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 30days/24hr/60m/60s/1000ms
      keys: [config[env].cookieKey] // unique cookie key to encrypt/decrypt
    })
  );
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set('json spaces', 2); // sets JSON spaces for clarity
};
