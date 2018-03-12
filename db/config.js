const promise = require('bluebird');
const monitor = require('pg-monitor');
const vars    = require('../config/vars');
const env     = process.env.NODE_ENV;

const initOptions = {
  error(err, e) {
    if (e.cn) {
      // this is a connection-related error
      // cn = safe connection details passed into the library:
      //      if password is present, it is masked by #
      console.log('ERROR: ', e.cn);
    }
  },
  promiseLib: promise // intialize bluebird as promise handler
}

const pgp = require('pg-promise')(initOptions) // initialize pg-promise w/options

// Database connection details;
const db = pgp({
  host: vars[env].host, // 'localhost' is the default;
  password: vars[env].dbpassword,
  port: vars[env].dbport, // 5432 is the default;
  user: vars[env].dbowner,
  database: vars[env].database,
});

if (env !== 'production') monitor.attach(initOptions); // database connection logger

// if process is terminated, terminate database connection
process.on('SIGINT', () => {
  db.$pool.end(() => {
    console.log('\nDisconnected from database!');
    process.exit(0);
  })
});

module.exports = db;
