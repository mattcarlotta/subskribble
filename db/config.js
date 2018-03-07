const promise = require('bluebird');
const monitor = require('pg-monitor');
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
  host: process.env.HOST, // 'localhost' is the default;
  password: process.env.DBPASSWORD,
  port: process.env.DBPORT, // 5432 is the default;
  user: process.env.DBUSER,
  database: process.env.DB,
}); // database instance;

if (process.env.NODE_ENV !== 'production') monitor.attach(initOptions); // database connection logger

// if process is terminated, terminate database connection
process.on('SIGINT', () => {
  db.$pool.end(() => {
    console.log('\nDisconnected from database!');
    process.exit(0);
  })
});

module.exports = db;
