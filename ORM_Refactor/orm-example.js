/* You'll need to
 * npm install sequelize
 * before running this example. Documentation is at http://sequelizejs.com/
 */

var Sequelize = require("sequelize");
exports.sequelize = new Sequelize("chatter", "root", "password1");

exports.sequelize.authenticate().complete(function(err) {
  if(!err) {
    console.log('Connection has been established successfully');
  } else {
    console.log('Unable to connect to the database:', err);
  }
});
/* TODO this constructor takes the database name, username, then password.
 * Modify the arguments if you need to */

/* first define the data structure by giving property names and datatypes
 * See http://sequelizejs.com for other datatypes you can use besides STRING. */
exports.Users = exports.sequelize.define('Users', {
  username: Sequelize.STRING
});

exports.Message = exports.sequelize.define('Messages', {
  // userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
}, {
timestamps:false
});
//  ,{
//   createdAt: 'date_of_creation',
//   updatedAt: 'last_update'
// });

exports.Users.hasMany(exports.Message);
exports.Message.belongsTo(exports.Users);


/* .sync() makes Sequelize create the database table for us if it doesn't
 *  exist already: */
exports.Users.sync({force: true}).success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = exports.Users.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    exports.Users.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

exports.Message.sync({force: true}).success(function(){
  console.log('message table created');
});

// exports.Users.create({}).complete(function(err, source) {
//   exports.Message.create({}).complete(function(err, target) {
//     // Set the association
//     exports.Users.setTarget(target).complete(function(err) {
//       exports.Users.getTarget().complete(function(err, _target) {
//         console.log(_target.values);
//       });
//     });
// });
// });
