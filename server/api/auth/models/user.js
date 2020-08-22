const mongoose = require('mongoose'),
      Schema = mongoose.Schema;

const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String,
  firstName: String,
  lastName: String,
  contactEmail: String,
  contactPhone: String,
  comment: String,
  paymentInfo: String
});

// On Save Hook, encrypt password
userSchema.pre('save', function(next) {
  const user = this;

  console.log( '+++ userSchema.pre.save', user)

  // generate a salt then run callback
  bcrypt.genSalt(10, function(err, salt) {
    if (err)
      return next(err);

    // hash (encrypt) our password using the salt
    bcrypt.hash(user.password, salt, null, function (err, hash) {
      if (err)
        return next(err);

      console.log( '+++ encrypted password', hash)
        
      // overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  })
});

userSchema.methods.comparePassword = function (candidatePassword, callback) {
  console.log('+++ comparePassword', candidatePassword, this.password);
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {  // this.password is hashed.
    if (err)
      return callback(err);

    callback(null, isMatch);
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = ModelClass;