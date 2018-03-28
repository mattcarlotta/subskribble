const moment				= require('moment');
const morgan 				= require('morgan');
const bodyParser 		= require('body-parser');
const cors					= require('cors');
const vars        	= require('../config/vars.js');

const env = process.env.NODE_ENV;
console.log(`[${env.toUpperCase()} ENVIRONMENT] \n`, vars[env], "\n");
//============================================================//
/* APP MIDDLEWARE */
//============================================================//
module.exports = app => {
	app.set('env', env); // sets current env mode (development, production or test)
	app.set('host', vars[env].host); // sets localhost or remote host
	app.set('dbpassword', vars[env].dbpassword);
	app.set('dbport', vars[env].dbport);
	app.set('dbowner', vars[env].dbowner);
	app.set('database', vars[env].database);
 	app.set("port", vars[env].port);
	app.set("moment", moment);
	app.use(cors()); // allows cross origin calls
	app.use(morgan('tiny')); // logging framework
	app.use(bodyParser.json()); // parse req.bodyParser
	app.use(bodyParser.urlencoded({ extended: true }));
	app.set('json spaces', 2);
};
