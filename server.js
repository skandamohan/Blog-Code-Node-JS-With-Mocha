var express = require('express');

var mysql = require('mysql');

/*
 * Main application file
 */

var app = express();

app.use(express.bodyParser()); // need this to see the body in req object

var serverport = 3000;

require('./routes')(app, serverport);

app.use('/styles', express.static(__dirname + '/styles'));

console.log('The node server is now running on port ' + serverport);

module.exports = app;