/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require("request"); // You might need to npm install the request module!
var expect = require('../../node_modules/chai/chai').expect;

describe("Persistent Node Chat Server", function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      // TODO: Fill this out with your mysql username
      user: "root",
      // and password.
      password: "password1",
      database: "chatter"
    });
    dbConnection.connect();

    var tablename = "Messages"; // TODO: fill this out

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query("truncate " + 'Users');
    dbConnection.query("truncate " + tablename, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it("Should insert posted messages to the DB", function(done) {
    // Post a message to the node chat server:
    request({method: "POST",
             uri: "http://127.0.0.1:3000/classes/messages",
             json: {username: "Valjean",
                    message: "In mercy's name, three days is all I need.",
                    roomname: "Hello"}
            },
            function () {
              /* Now if we look in the database, we should find the
               * posted message there. */

              var queryString = 'SELECT * FROM Messages';
              var queryArgs = ['*'];
              /* TODO: Change the above queryString & queryArgs to match your schema design
               * The exact query string and query args to use
               * here depend on the schema you design, so I'll leave
               * them up to you. */
              dbConnection.query( queryString, queryArgs,
                function(err, results) {
                  // Should have one result:
                  expect(results.length).to.equal(1);
                  expect(results[0].text).to.equal("In mercy's name, three days is all I need.");
                  /* TODO: You will need to change these tests if the
                   * column names in your schema are different from
                   * mine! */

                  done();
                });
            });
  });

  it("Should output all messages from the DB", function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO Messages (text, roomname, UserId) VALUES ("Men like you can never change!", "main", 1);';
    var queryArgs = ['*'];
    /* TODO - The exact query string and query args to use
     * here depend on the schema you design, so I'll leave
     * them up to you. */

    dbConnection.query( queryString, queryArgs,
      function(err, results) {
        console.log('results in second spec2 are :', results);
        console.log('error is ', err);
        if (err) { throw err; }
        /* Now query the Node chat server and see if it returns
         * the message we just inserted: */
        request("http://127.0.0.1:3000/classes/messages",
          function(error, response, body) {
            console.log('response in second spec is:  ', response);
            console.log('body is  ', body);
            var messageLog = JSON.parse(body);
            expect(messageLog[0].text).to.equal("Men like you can never change!");
            expect(messageLog[0].roomname).to.equal("main");
            done();
          });
      });
  });
});
