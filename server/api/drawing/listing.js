const express = require( 'express' ),
      router = express.Router()

const Drawing = require( './models/drawing' )      

router.get( '/:id*?', function ( req, res, next ) {
  Drawing.findByUser( req.id, function ( err, listing ) {
    if ( err )
      res.status( 500 ).send( 'error getting' )
    else {
      res.json( listing.map( ( { id, user, thumbnail } ) => ( { id, user, thumbnail } ) ) )
    }
  } )
} )

module.exports = router
