"use strict";

var _EntoliOutput = require("./EntoliOutput");

var chalk = require('chalk');

console.log(chalk.blue('Hello world!'));

var readline = require('readline');

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
var i = 0;
var s = new _EntoliOutput.EntoliOutput();
s.setup();
process.stdin.on('keypress', function (str, key) {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    if (key.name == 'e') {
      return;
    }

    i += 1;
    s.update([['i', i]]);
  }
});