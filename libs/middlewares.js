const bodyParser 		= require('body-parser');
const cookieParser = require('cookie-parser');
const cors					= require('cors');
const passport 			= require('passport');
const moment				= require('moment');
const morgan 				= require('morgan');
const vars        	= require('../config/vars.js');

const env = process.env.NODE_ENV;
console.log(`[${env.toUpperCase()} ENVIRONMENT] \n`, vars[env], "\n");
//============================================================//
/* APP MIDDLEWARE */
//============================================================//
module.exports = app => {
	app.set('env', env); // sets current env mode (development, production or test)
	app.set('apiURL', vars[env].apiURL);
	app.set("cookieKey", vars[env].cookieKey);
	app.set('host', vars[env].host); // sets localhost or remote host
	app.set('dbpassword', vars[env].dbpassword);
	app.set('dbport', vars[env].dbport);
	app.set('dbowner', vars[env].dbowner);
	app.set('database', vars[env].database);
 	app.set("port", vars[env].port);
	app.set("moment", moment);
	app.set("passport", passport);
	app.set("sendgridAPIKey", vars[env].sendgridAPIKey);
	// app.use(cors()); // allows cross origin calls
	app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
	app.use(morgan('tiny')); // logging framework
	app.use(bodyParser.json()); // parse req.bodyParser
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(cookieParser());
	// app.use(cookieSession({
	// 	maxAge: 30 * 24 * 60 * 60 * 1000, // expire after 30 days, 24hr/60m/60s/1000ms
	// 	keys: [vars[env].cookieKey]
	// }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.set('json spaces', 2);
};
