const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      requireAuth = passport.authenticate('jwt', {session: false}),
      requireSignin = passport.authenticate('local', {session: false});

const authentication = require('./controllers/authentication');
      passportService = require('./services/passport');

router.get('/posts', requireAuth, function (req, res) {
  res.send({hi: 'there'});
});
router.post('/signin', requireSignin, authentication.signin);
router.post('/signup', authentication.signup);

module.exports = router;
