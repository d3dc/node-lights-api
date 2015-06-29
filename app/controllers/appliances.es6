var express  = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Appliance  = mongoose.model('Appliance');
var callbackWith = require('../util').jsonResponseCallback;
var bridge = require('../bridge/manager');
var slug = require('slug');

export default (app) => {
  app.use('/appliances', router);
}

router.get('/', (req, res, next) => {
  Appliance.find(callbackWith(res, next));
});

router.get('/:slug', (req, res, next) => {
  Appliance.findOne({slug: req.params.slug}, callbackWith(res, next));
});

router.get('/:slug/:cmd', (req, res, next) => {
  Appliance.findOne({slug: req.params.slug}, (err, appliance) => {
    if (err) return next(err);
    var cmd = req.params.cmd;
    if (appliance.commands.indexOf(cmd) == -1)
      return next(new Error('command not supported: ' + cmd + " appliance: " + this.name));
    bridge.sendCommand(cmd, appliance);
    // bridge.once(appliance.slug + '_updated', () => { res.send('OK'); });
    res.send('OK');
  });
});

router.post('/', (req, res, next) => {
  if (!req.body.slug && req.body.name) req.body.slug = slug(req.body.name);
  var appliance = new Appliance(req.body);
  appliance.fillIn();
  appliance.save((err) => {
    if (!err) {
      console.log("created");
      res.json(appliance);
    } else {
      console.log(err);
      return next(err);
    }
  });
});

router.put('/:slug', (req, res, next) => {
  Appliance.update({slug: req.params.slug}, req.body, (err, num) => {
    if (!err)
      res.send(num);
    else
      next(err);
  });
});
