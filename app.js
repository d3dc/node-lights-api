require('babel/register');

var express = require('express'),
  config = require('./config/config'),
  mongoose = require('mongoose'),
  requirePackage = require('./app/util').requireAppPackage;

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

// Initialize models after DB
requirePackage('models');

var app = express();

require('./config/express')(app, config);

app.listen(config.port);

