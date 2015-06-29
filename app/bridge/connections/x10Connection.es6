var net = require('net');
var config = require('../../../config/config');

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
      console.log(data.toString());
    });

    this.bridge = bridge;
    this.bridge.on('x10_command', (cmd, dev) => {
      this.handleCommand(cmd, dev);
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

module.exports = (bridge) => {
  new x10Connection(bridge);
}