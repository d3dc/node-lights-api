// Appliance schema

var mongoose = require('mongoose');

let ApplianceSchema = new mongoose.Schema({
  interface: String,
  address: String,
  name: {
    type: String,
    index : { unique : true },
  },
  status: {},
  commands: [String],
});

ApplianceSchema.methods.toString = () => {
  return this.interface + ": " + this.name + " (" + this.address + ")";
};

module.exports.schema = ApplianceSchema;
module.exports.model = mongoose.model('Appliance', ApplianceSchema);

