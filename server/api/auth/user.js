const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      requireAuth = passport.authenticate('jwt', {session: false}),
      requireSignin = passport.authenticate('local', {session: false});

const User = require('./models/user');

const authentication = require('./controllers/authentication');
      passportService = require('./services/passport');

router.get('/:id', requireAuth, function (req, res) {
  console.log('+++ fetching user', req.params.id);
  User.findOne({
    _id: req.params.id
  }, function (err, user) {
    if (err)
      return next(err);

    if (!user)
      return res.status(422).send({error: 'User not found'});   // unprocessable entity

    // return res.send({id: user.id, ...user});
    user.id = user.id;
    return res.send(user);
  });  
});

router.put('/', requireAuth, function (req, res) {
  const { email } = req.body;
  console.log('+++ updating user', req.body);
  User.update({
      email
    }, {
      $set: req.body
    }, function (err, numAffected) {
    if (err)
      return next(err);

    return res.send(req.body);
  });
  // User.findOne({email}, function (err, user) {
  //   if (err)
  //     return next(err);

  //   if (!user)
  //     return res.status(422).send({error: 'User not found'});   // unprocessable entity

  //   // req.body.forEach()
  //   user.contactEmail = req.body.contactEmail;
  //   console.log(user);
  //   bcrypt.genSalt(10, function(err, salt) {
  //   });
  //   // user.save();
  //   return res.send(user);
  // });
});
      
module.exports = router;
