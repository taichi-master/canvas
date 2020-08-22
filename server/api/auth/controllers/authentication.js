const jwt = require('jwt-simple');  // https://jwt.io

const User = require('../models/user'),
      config = require('../../../config');

function tokenForUser (user) {
  const timestamp = new Date().getTime();
  return jwt.encode({sub: user.id, iat: timestamp, expire: Date.now() + (1000 * 60 * 1) }, config.secret); //sub = subject, iat = issued at time
}

exports.signin = function (req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token

  console.log('+++ signin', req.user.email, req.user.password);
  
  // const obj = {...req.user._doc, token: tokenForUser(req.user), id: req.user.id};
  // const { _id, __v, ...user } = obj;
  const user = req.user._doc;
  user.id = req.user.id;
  user.token = tokenForUser(req.user);
  res.send(user);
}

exports.signup = function (req, res, next) {
  const { email, password } = req.body;

  console.log('+++ signup', email, password);

  if (!(email && password))
    return res.status(422).send({error: 'You must provide email and password'});

  // See if a user with the given email exists
  User.findOne({email}, function (err, existingUser) {
    if (err)
      return next(err);

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'});   // unprocessable entity
    }

    // If a user with email does NOT exits, create and save user record
    const user = new User({email, password});
    user.save(function (err) {
      if (err)
        return next(err);
      
      // Respond to request indicating the user was created
      // res.send({...req.user, token: tokenForUser(user)});
      res.send({...user, token: tokenForUser(user)});
    });
  });
}