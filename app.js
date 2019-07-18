'use strict';
const yargs = require('yargs');
require('./scripts/commands');

console.log("Welcome to the maze! \r\nTo get started type a command or run --help to learn more.");

let stdin = process.openStdin();
stdin.addListener("data", function (d) {
  return yargs.parse(d.toString().trim());
});