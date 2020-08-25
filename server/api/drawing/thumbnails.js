const express = require( 'express' ),
      router = express.Router()

const Drawing = require( './models/drawing' )      

router.get( '/:id*?', function ( req, res, next ) {
  const id = req.params.id

  Drawing.findByUser( id && +id, function ( err, thumbnails ) {
    if ( err )
      res.status( 500 ).send( 'error getting' )
    else {
      res.json( thumbnails.map( ( { id, user, thumbnail } ) => ( { id, user, thumbnail } ) ) )
    }
  } )
} )

module.exports = router
