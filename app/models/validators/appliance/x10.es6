let defaults = {
  commands:['on', 'off', 'toggle'],
}

export var cName = 'x10'

export function validate(appliance) {
  defaults.commands.forEach( (cmd) => {
    if (this.commands.indexOf(cmd) == -1)
      this.commands.push(cmd);
  });
}