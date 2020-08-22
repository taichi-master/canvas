// emulate mongoose

const config = require( '../../../config' )

const JsonDB = require( 'node-json-db' ).JsonDB,
      Config = require( 'node-json-db/dist/lib/JsonDBConfig' ).Config,
      db = new JsonDB( new Config( config.dbFile, true, true, '/' ) )

const bcrypt = require( 'bcrypt-nodejs' )

class User {
  constructor ( user ) {
    this.id = user.id || Date.now()
    this.email = user.email
    this.password = user.password
    this._doc = {
      id: this.id,
      email: this.email,
      password: user.password
    }
  }

  preSave ( next ) {
    const user = this
  
    console.info( '+++ userSchema.pre.save', user )
  
    // generate a salt then run callback
    bcrypt.genSalt( 10, function ( err, salt ) {
      if ( err )
        return next( err )
  
      // hash (encrypt) our password using the salt
      bcrypt.hash( user.password, salt, null, function ( err, hash ) {
        if ( err )
          return next( err )
  
        console.info( '+++ encrypted password', hash )
          
        // overwrite plain text password with encrypted password
        user.password = hash
        next()
      } )
    } )
  }

  save ( callback ) {
    this.preSave( ( err ) => {
      if ( err ) {
        callback( err )
      } else {
        try {
          const { id, email, password } = this
      
          db.push( '/users[]', { id, email, password } )
          callback( null )
      
        } catch ( err ) {
          callback( err )
        }
      }
    } )
  }
  
  comparePassword ( candidatePassword, callback ) {
    console.info( '+++ comparePassword', candidatePassword, this.password )
    bcrypt.compare( candidatePassword, this.password, function ( err, isMatch ) { // this.password is hashed.
      if ( err )
        return callback( err )
    
      callback( null, isMatch )
    } )
  }
}

User.findOne = ( obj, callback ) => {
  try {

    const index = db.getIndex( '/users', obj.email, 'email' ) // hard code for now.

    if ( ~index ) {

      const users = db.getData( '/users' )

      console.log( users[index] )

      callback( null, new User( users[index] ) )

    } else
      callback( null, null )

  } catch ( err ) {
    callback( err, null )
  }
}

User.findById = ( id, callback ) => {
  try {

    const index = db.getIndex( '/users', id )

    if ( ~index ) {

      const users = db.getData( '/users' )

      callback( null, new User( users[index] ) )

    } else
      callback( 'id not found', null )

  } catch ( err ) {
    callback( err, null )
  }
}

module.exports = User