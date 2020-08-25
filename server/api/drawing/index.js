const express = require( 'express' ),
      router = express.Router()

const passport = require( 'passport' ),
      requireAuth = passport.authenticate( 'jwt', { session: false } )

const Drawing = require( './models/drawing' )      

router.get( '/:id', requireAuth, function ( req, res, next ) {
  const id = req.params.id

  Drawing.findById( +id, function ( err, drawing ) {
    if ( err )
      res.status( 500 ).send( 'error getting' )
    else {
      res.json( drawing )
    }
  } )
} )

router.post( '/', requireAuth, function ( req, res, next ) { // create
  const drawing = new Drawing( req.body )

  drawing.save( function ( err, drawing ) {
    if ( err )
      res.status( 500 ).send( 'error posting' )
    else {
      res.status( 201 ).json( drawing )
    }
  } )
} )

router.delete( '/:id', requireAuth, function ( req, res, next ) {
  const id = req.params.id

  Drawing.findByIdAndRemove( +id, function ( err, drawing ) {
    if ( err )
      res.status( 500 ).send( 'error deleting' )
    else {
      res.status( 204 ).json( drawing )
    }
  } )
} )

module.exports = router
