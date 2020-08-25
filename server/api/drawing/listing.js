const express = require( 'express' ),
      router = express.Router()

const passport = require( 'passport' ),
      requireAuth = passport.authenticate( 'jwt', { session: false } )

const Drawing = require( './models/drawing' )      

router.get( '/:id', requireAuth, function ( req, res, next ) {
  Drawing.findByUser( req.params.id, function ( err, drawing ) {
    if ( err )
      res.status( 500 ).send( 'error getting' )
    else {
      res.json( drawing )
    }
  } )
} )

module.exports = router
