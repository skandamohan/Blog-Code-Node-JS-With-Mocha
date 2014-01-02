/*
 * Main database setup file
 */

var mysql = require('mysql');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '[your password]',
	database : '[your databasename]',
	port     : 3306,
});

connection.connect(function(err){
	
	if(err){
		console.log(err);
	} else {
		console.log('The node server is now connected to ' + connection.config.host +
			' via user ' + connection.config.user +' to the database '+connection.config.database);
	}
});

module.exports = connection;