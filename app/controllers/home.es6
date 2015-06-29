var express  = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Appliance  = mongoose.model('Appliance')

export default (app) => {
  app.use('/', router);
}

router.get('/', (req, res, next) => {
  Appliance.find( (err, appliances) => {
    if (err) return next(err)
    res.render('index', {
      title: 'Node-Lights-API',
      appliances: appliances,
    });
  });
});
