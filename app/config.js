var mongoose = require('mongoose');

// setting the location of the db 'shortlydb' at localhost,
// default port of 27017
var mongoAddress = 'mongodb://localhost/shortlydb';
// connect mongoose to the address from above
mongoose.connect(mongoAddress);

var db = mongoose.connection;

// set up an error listener for the mongoose DB
db.on('error', console.error.bind(console, 'Error, mongoose DB not connected: '));
// run once when the mongoose DB is initialized
db.once('open', function() {
  console.log('Mongo DB connection opened');
});

module.exports = db;
