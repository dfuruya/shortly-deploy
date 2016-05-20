var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  // enforce a unique username
  username: {
    type: String,
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: true
  }
});

var User = mongoose.model('User', userSchema);

userSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

User.prototype.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    if (err) {
      callback(err);
    } else {
      callback(null, isMatch);
    }
  });
};


module.exports = User;
