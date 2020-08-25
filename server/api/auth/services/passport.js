const passport = require( 'passport' ),
      LocalStrategy = require( 'passport-local' ),
      JwtStrategy = require( 'passport-jwt' ).Strategy,
      ExtractJwt = require( 'passport-jwt' ).ExtractJwt

const User = require( '../models/user' ),
      config = require( '../../../config' )

// Create local strategy 
const localOptions = {
  usernameField: 'email'
}

const localLogin = new LocalStrategy( localOptions, function ( email, password, done ) {
  console.log( '+++ localLogin', email, password )
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  User.findOne( { email }, function ( err, user ) {
    if ( err )
      return done( err )
    
    if ( !user )
      return done( null, false )

    // compare passwords - is `password` equal to user.password?
    user.comparePassword( password, function ( err, isMatch ) {
      if ( err )
        return done( err )
    
      if ( !isMatch )
        return done( null, false )

      return done( null, user ) // this will put user into the request (i.e. req.user )
    } )
  } )
} )

// Setup options for JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader( 'authorization' ),
  secretOrKey: config.secret
}

// Create JWT strategy
const jwtLogin = new JwtStrategy( jwtOptions, function ( payload, done ) {
  // See if the user ID in the payload exits in our database
  // If it does, call 'done' with that other
  // otherwise, call done without a user object
  User.findById( payload.sub, function ( err, user ) {
    if ( err )
      return done( err, false )
    
    if ( !user )
      return done( null, false )
    
    return done( null, user )
  } )
} )

// Tell passport to use this strategy
passport.use( jwtLogin )
passport.use( localLogin )