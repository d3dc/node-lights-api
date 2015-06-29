var net = require('net');
var config = require('../../../config/config');
var Appliance = require('mongoose').model('Appliance');

class x10Connection {
  constructor(bridge) {
    // Create a net.Socket connecting us to a mochad server
    this.client = net.connect(config.x10port, config.x10host);
    // Listen for net.Socket events
    this.client.on('connect', () => {
      console.log('connected to x10 server!');
    });

    this.client.on('error', (error) => {
      console.log(error);
    });

    this.client.on('end', () => {
      console.log('disconnected from x10 server');
    });

    this.client.on('data', (data) => {
      this.handleData(data);
    });

    this.bridge = bridge;
    this.bridge.on('x10_command', (cmd, dev) => {
      this.handleCommand(cmd, dev);
    });
  }

  handleData(data) {
    var tags = data.toString().split(' ')
    //Date Time Tx RF CodeType: Code Func: Func
    var codeType = tags[4],
        code = tags[5];
    if (tags.length > 7) var func = tags[7];
    else var func = null;

    Appliance.findOne({interface: "x10", address: code}, (err, appliance) => {
      if (!err && appliance) {
        switch(codeType) {
          case 'HouseUnit:':
            // Unit code updated with function name
            this.bridge.emit(appliance.slug+'_updated', func);
            console.log(appliance.slug);
            break;
          case 'House:':
            // House code updated with function name
            this.bridge.emit(appliance.slug+'_updated', func);
            break;
        }
      }
     });
  }

  handleCommand(cmd, dev) {
    if (cmd === 'toggle') {
      if (dev.status.on) {
        delete dev.status.on;
        cmd = 'off';
      } else {
        dev.status.on = true;
        cmd = 'on';
      }
    }

    this.sendCommand(dev.address, cmd);
  }

  sendCommand(address, cmd) {
    this.client.write('rf ' + address + ' ' + cmd + '\r');
  }
}

export default (bridge) => {
  new x10Connection(bridge);
}