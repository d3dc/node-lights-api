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
    db: 'mongodb://localhost/node-lights-api-development',
  },

  test: {
    root: rootPath,
    app:{
      name: 'node-lights-api'
    },
    port: 3000,
    db: 'mongodb://localhost/node-lights-api-test',
  },

  production: {
    root: rootPath,
    app: {
      name: 'node-lights-api'
    },
    port: 3000,
    db: 'mongodb://localhost/node-lights-api-production',
  },
};

module.exports = config[env]
