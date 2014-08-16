var mysql = require('mysql');
var mysql = require('mysql');

var orm = require('./orm-example.js');
/* If the node mysql module is not found on your system, you may
 * need to do an "sudo npm install -g mysql". */

/* You'll need to fill the following out with your mysql username and password.
 * database: "chat" specifies that we're using the database called
 * "chat", which we created by running schema.sql.*/
var dbConnection = mysql.createConnection({
  // host: 'localhost',
  // port: '3306',
  user: "root",
  password: "password1",
  database: "chat"
});

dbConnection.connect();
/* Now you can make queries to the Mysql database using the
 * dbConnection.query() method.
 * See https://github.com/felixge/node-mysql for more details about
 * using this module.*/




exports.findAllMessages = function(cb){
	orm.Message.findAll().success(cb);
	// var sql = "SELECT * FROM messages";
	// dbConnection.query(sql, cb);
};

exports.findUser = function(username, cb){
	//make sql query
	orm.Users.find({where: {username: username}}).success(cb);
	// var sql = 'SELECT * FROM users WHERE user_name = "'+username+'";';
	// // var sql = 'SELECT user_name FROM users WHERE user_name = "andrew";';
	// dbConnection.query(sql, cb);
};

exports.saveUser = function(username, cb){
	var newUser = orm.Users.create({username: username}).complete(cb);
	// var sql = 'INSERT INTO users (user_name) VALUES ("'+username+'");';
	// dbConnection.query(sql, cb);
};

exports.saveMessage = function(message, userid, roomname, cb){
	// add message to sql database
	var newMessage = orm.Message.create({text: message, UserId: userid, roomname: roomname}).complete(cb);
	// var sql = 'INSERT INTO messages (message, roomname, id_users) VALUES ("'+message+'", "'+roomname+'","'+userid+'");';
	// dbConnection.query(sql, cb);
};

// exports.findUser('luby', function(err, results) {
// 	console.log('err is:', err);
// 	console.log('results are: ', results);
// });

// exports.saveUser('hello', function(err, results) {
// 	console.log('SaveUser results are: ', results.insertId);
// 	console.log('SaveUser error is: ', err);
// });

// exports.saveMessage('hello world', 1, 'lobby', function(err, results) {
// 	console.log('results are: ', results);
// 	console.log('err is: ', err);
// })

// exports.findAllMessages(function(err, results) {
// 	console.log('err is: ',err);
// 	console.log('results are :', results);
// })
