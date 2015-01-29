#!/usr/bin/env node
var path = require('path');

var ronin = require('ronin');

// root path, where commands folder is
var commandsPath = path.join(__dirname, '../../src/bin');
var program = ronin(commandsPath);

program.run();
