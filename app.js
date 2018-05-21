const express 	= require('express');
const app 			= express();
const consign 	= require('consign');

consign({ locale: 'en-us', verbose: false})
	.include('libs/middlewares.js') // express middlewares
	.then("database/db.js")
	.then("database/query.js")
	.then("shared")
	.then("services")
  .then("controllers")
  .then("routes")
	.then('libs/server.js')
  .into(app);
