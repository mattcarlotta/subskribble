const path = require('path');
const express = require('express');
const config = require('env');

export default (app) => {
  const env = process.env.NODE_ENV;
  //= ===========================================================//
  /* PRODUCTION CONFIGS */
  //= ===========================================================//
  if (env === 'production') {
    // Express will serve up production assets
    app.use(express.static('client/build'));

    // Express will serve up the front-end index.html file if it doesn't recognize the route
    app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')));
  }

  //= ===========================================================//
  /* CREATE EXPRESS SERVER */
  //= ===========================================================//
  app.listen(config[env].port);
};
