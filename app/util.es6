var glob = require('glob');
var config = require('../config/config');

export function jsonResponseCallback(res, next) {
  return (err, appliance) => {
    if (err) return next(err);
    res.json(appliance);
  };
};

export function requireAppPackage(p, func) {
  var packageFiles = glob.sync(config.root + '/app/'+p+'/*.es6');
  packageFiles.forEach(function (file) {
    var r = require(file);
    if (func) return func(r);
  });
};
