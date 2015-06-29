var path     = require('path');
var rootPath = path.normalize(__dirname + '/..');
var env      = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'node-lights-api',
    },
    port: 3000,
    x10host: 'Rocket-Badger',
    x10port: 1099,
    db: 'mongodb://localhost/node-lights-api-development',
  },

  test: {
    root: rootPath,
    app:{
      name: 'node-lights-api'
    },
    port: 3000,
    x10host: '192.168.1.127',
    x10port: 1099,
    db: 'mongodb://localhost/node-lights-api-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'node-lights-api'
    },
    port: 3000,
    x10host: 'localhost',
    x10port: 1099,
    db: 'mongodb://localhost/node-lights-api-production',
  },
};

module.exports = config[env]
