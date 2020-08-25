const config = require( '../../../config' )

const JsonDB = require( 'node-json-db' ).JsonDB,
      Config = require( 'node-json-db/dist/lib/JsonDBConfig' ).Config,
      db = new JsonDB( new Config( config.dbFile, true, true, '/' ) )

class Drawing {
  constructor ( drawing ) {
    const {
      id,
      user,
      isPrivate,
      creationDateTime,
      elapsedTime,
      history,
      thumbnail
    } = drawing

    this.id = id
    this.user = user
    this.isPrivate = isPrivate
    this.creationDateTime = creationDateTime
    this.elapsedTime = elapsedTime
    this.history = history
    this.thumbnail = thumbnail
  }

  preSave ( next ) {
    next()
  }

  save ( callback ) {
    this.preSave( ( err ) => {
      if ( err ) {
        callback( err )
      } else {
        try {
          const lastSaved = new Date(),
                id = this.id,
                index = id ? db.getIndex( '/drawings', id ) + '' : ''

          this.id = id || Date.now()
          db.push( `/drawings[${index}]`, { ...this, lastSaved } )
          this.lastSaved = lastSaved
          callback( null )
      
        } catch ( err ) {
          callback( err )
        }
      }
    } )
  }  
}

Drawing.findByUser = ( user, callback ) => {

  try {
    const drawings = db.getData( '/drawings' )

    callback( null, drawings.filter( x => x.user === user || !x.isPrivate ) ) // only allow owner's or public drawings

  } catch ( err ) {
    callback( err, null )
  }
}

Drawing.findById = ( id, callback ) => {
  try {
    const index = db.getIndex( '/drawings', id )

    if ( ~index ) {

      const drawings = db.getData( '/drawings' )

      callback( null, new Drawing( drawings[index] ) )

    } else
      callback( 'id not found', null )

  } catch ( err ) {
    callback( err, null )
  }
}

Drawing.findByIdAndRemove = ( id, callback ) => {
  try {

    const index = db.getIndex( '/drawings', id )

    if ( ~index ) {

      const drawings = db.getData( '/drawings' )

      db.delete( `/drawings[${index}]` )

      callback( null, new Drawing( drawings[index] ) )

    } else
      callback( 'id not found', null )

  } catch ( err ) {
    callback( err, null )
  }
}

module.exports = Drawing