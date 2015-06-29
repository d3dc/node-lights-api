var mongoose = require('mongoose');

var validateMap = {}
require('../util').requireAppPackage('models/validators/appliance', (vali) => {
  validateMap[vali.cName] = vali;
});

let ApplianceSchema = new mongoose.Schema({
  interface: String,
  address: String,
  slug: {
    type: String,
    index : { unique : true },
  },
  name: {
    type: String,
    index : { unique : true },
  },
  status: {},
  commands: [String],
  group: {
    type: mongoose.Schema.ObjectId,
    ref: 'group',
  },
});

ApplianceSchema.methods.toString = function() {
  return this.interface + ": " + this.name + " (" + this.address + ")";
};

// TODO: Could this be middleware?
ApplianceSchema.methods.fillIn = function() {
  console.log(validateMap)
  validateMap[this.interface].validate.call(this);
}

export var schema = ApplianceSchema;
export var model = mongoose.model('Appliance', ApplianceSchema);

