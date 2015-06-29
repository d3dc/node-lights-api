// Appliance schema

var mongoose = require('mongoose');

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
});

ApplianceSchema.methods.toString = function() {
  return this.interface + ": " + this.name + " (" + this.address + ")";
};

module.exports.schema = ApplianceSchema;
module.exports.model = mongoose.model('Appliance', ApplianceSchema);

