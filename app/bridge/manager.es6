var requirePackage = require('../util').requireAppPackage;
var EventEmitter = new require('events').EventEmitter;

class Bridge extends EventEmitter {
  sendCommand(cmd, appliance) {
    this.emit(appliance.interface + '_command', cmd, appliance);
    //this.emit('send_command', cmd, appliance);
  }
}

var bridge = new Bridge();

export default bridge;

// Wire up all connections to this bridge
requirePackage('bridge/connections', (conn) => {
  conn(bridge);
});