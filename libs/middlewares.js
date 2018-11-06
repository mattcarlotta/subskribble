const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const cors = require('cors');
const each = require('lodash/each');
const isEmpty = require('lodash/isEmpty');
const LocalStrategy = require('passport-local').Strategy;
const lorem = require('lorem-ipsum');
const moment = require('moment');
const morgan = require('morgan');
const passport = require('passport');
const promiseEach = require('bluebird').each;
const random = require('lodash/random');
const config = require('../env/config.js');

const env = process.env.NODE_ENV;
const currentENV = () => {
  const envirnoment = config[env];
  const keys = Object.keys(envirnoment);
  const values = Object.values(envirnoment);

  let variables = '';
  for (let i = 0; i < keys.length; i += 1) {
    variables += `\x1b[33m• ${keys[i].toUpperCase()}\x1b[0m: ${values[i]} \n `;
  }
  return variables;
};

// eslint-disable-next-line no-console
console.log(
  `\n[ \x1b[1m${env.toUpperCase()} ENVIRONMENT\x1b[0m ]\n ${currentENV()}`,
);

if (env !== 'development') {
  // eslint-disable-next-line no-console
  console.log(
    `\n\x1b[1mYour application is running on: ${config[env].portal}\x1b[0m`,
  );
}
//= ===========================================================//
/* APP MIDDLEWARE */
//= ===========================================================//
module.exports = (app) => {
  // / CONFIGS ///
  app.set('env', env); // sets current env mode (development, production or test)
  app.set('host', config[env].host); // sets localhost or remote host
  app.set('dbpassword', config[env].dbpassword); // sets database password
  app.set('dbport', config[env].dbport); // sets database port
  app.set('dbowner', config[env].dbowner); // sets owner of database
  app.set('database', config[env].database); // sets database name
  app.set('port', config[env].port); // current listening port
  app.set('portal', config[env].portal); // sets current front-end url

  // / HELPER FUNCTIONS ///
  app.set('each', each); // lodash each function
  app.set('isEmpty', isEmpty); // check if obj/arr is empty
  app.set('lorem', lorem); // fake text
  app.set('promiseEach', promiseEach); // bluebird promise-based each function
  app.set('random', random); // random number func

  // / FRAMEWORKS ///
  app.set('bcrypt', bcrypt); // framework for hashing/salting passwords
  app.set('LocalStrategy', LocalStrategy); // passport framework for handling local authentication
  app.set('moment', moment); // framework for managing time
  app.set('passport', passport); // framework for authenticating users
  app.set('sendgridAPIKey', config[env].sendgridAPIKey); // SendGrid API key for sending emails
  app.use(
    cors({
      credentials: true,
      origin: config[env].portal,
    }),
  ); // allows receiving of cookies from front-end
  app.use(morgan('tiny')); // logging framework
  app.use(bodyParser.json()); // parses header requests (req.body)
  app.use(bodyParser.urlencoded({ extended: true })); // allows objects and arrays to be URL-encoded
  app.use(cookieParser()); // parses header cookies
  app.use(
    cookieSession({
      // sets up a cookie session as req.session ==> set in passport local login strategy
      name: 'Authorization',
      maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 30days/24hr/60m/60s/1000ms
      keys: [config[env].cookieKey], // unique cookie key to encrypt/decrypt
    }),
  );
  app.use(passport.initialize()); // initialize passport routes to accept req/res/next
  app.set('json spaces', 2); // sets JSON spaces for clarity
};
