require('./config/vars');
const express = require('express');
const app = express();

require('./libs/expressMiddlewares')(app); // Hook up express middlewares (morgan/bodyParser)
// require('./libs/expressRoutes')(app); // Hook up express routes
require('./libs/expressServerSetup')(app, express); // Tell express to server client
