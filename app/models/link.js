var db = require('../config');
var crypto = require('crypto');

// import 'mongoose' library
var mongoose = require('mongoose');

// defining the Link schema
var linkSchema = mongoose.Schema({
  url: String,
  link: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number
});

// compiling the Link schema into a model;
// A model is a class with which we construct documents
var Link = mongoose.model('Link', linkSchema);

// define a pre-hook for the 'linkSchema' document
// when a link is 'saved'
linkSchema.pre('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});

module.exports = Link;
