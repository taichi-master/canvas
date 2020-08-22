const path = require( 'path' )

const express = require( 'express' ),
      compression = require( 'compression' ),
      favicon = require( 'serve-favicon' ),
      bodyParser = require( 'body-parser' ),
      logger = require( 'morgan' ),
      // mongoose = require( 'mongoose' ),
      app = express()

const pkg = require( '../package.json' ),
      dist = {
        'vendors.js': 'vendors.js',
        'runtime.js': 'runtime.js',
        'main.js': 'main.js',
        'main.css': 'main.css'
      },
      isDev = process.env.NODE_ENV === 'development'

// DB Setup
// mongoose.connect( 'mongodb://192.168.1.6:27017/pacListings', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true } )

// React and Redux.
const React = require( 'react' ),
      ReactDOMServer = require( 'react-dom/server' ),
      { StaticRouter } = require( 'react-router' ),

      App = isDev ? null : require( './libs/App' ).default,
      // { createStore, applyMiddleware } = require( 'redux' ), // server side redux
      { createStore } = require( 'redux' ), // server side redux
      { Provider } = require( 'react-redux' ),
      // thunkMiddleware = require( 'redux-thunk' ).default,
      // store = isDev ? null : createStore( require( './libs/reducers' ).default, pkg.cfg.initialState, applyMiddleware( thunkMiddleware ))
      store = isDev ? null : createStore( require( './libs/reducers' ).default, pkg.cfg.initialState )

function createPage ( pkg, style, initialState, appHtml ) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${pkg.cfg.name}</title>
        <meta charset="UTF-8">
        <meta name="description" content="${pkg.description}">
        <meta name="keywords" content="${pkg.keywords.join( ', ' )}">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        ${style}
        <script>window.__INITIAL_STATE__ = ${JSON.stringify( initialState )};</script>
      </head>
      <body>
        <div id="root">${appHtml}</div>
        <script src="/${dist['vendors.js']}"></script>
        <script src="/${dist['runtime.js']}"></script>
        <script src="/${dist['main.js']}"></script>
      </body>
    </html>
  `
}

// {/* <script src="/${dist['manifest.js']}"></script> */}

function setRoutes ( app ) {
  app.use( compression() )
  app.use( favicon( path.resolve( __dirname, '../assets', 'favicon.ico' ) ) )
  app.use( '/', express.static( path.resolve( __dirname, '../assets' ) ) )
  app.use( '/', express.static( path.resolve( __dirname, '../dist' ) ) )
  app.use( bodyParser.json() )
  app.use( bodyParser.urlencoded( { extended: false } ) )
  app.use( logger( 'dev' ) )

  // REST API
  app.use( '/api/auth', require( './api/auth' ) )
  app.use( '/api/user', require( './api/auth/user' ) )
  app.enable( 'trust proxy' )

  // main
  app.get( '*', function ( req, res ) {
    const context = {}
    // const appHtml = '<h1>Loading...</h1>'
    const appHtml = isDev ? '<h1>Loading...</h1>' : ReactDOMServer.renderToString(
      React.createElement( Provider, { store },
        React.createElement( StaticRouter, { location:req.url, context },
          React.createElement( App )
        )
      )
    )

    if ( context.url ) {
      res.writeHead( 301, {
        Location: context.url
      } )
      res.end()
    } else {
      res.send( createPage( pkg, isDev ? '' : `<link rel="stylesheet" href="/${dist['main.css']}" />`, pkg.cfg.initialState, appHtml ) )
    }
  } )
}

if ( isDev ) {
  try {
    // Hot reload
    const webpack = require( 'webpack' ),
          webpackDevMiddleware = require( 'webpack-dev-middleware' ),
          webpackHotMiddleware = require( 'webpack-hot-middleware' )

    config = require( '../webpack/development.js' )()
    compiler = webpack( config )

    app.use( webpackDevMiddleware( compiler, {
      publicPath: config.output.publicPath,
      logLevel: 'warn',
      stats: { colors: true }
    } ) )

    app.use( webpackHotMiddleware( compiler, {
      log: console.warn
    } ) )

    setRoutes( app )

  } catch ( err ) {
    console.error( err )
  }
} else {
  const manifest = require( '../dist/manifest.json' )

  Object.keys( dist ).forEach( k => dist[k] = manifest[k] )
  setRoutes( app )
}

if ( module == require.main ) {
  const port = process.env.PORT || '3000'

  app.listen( port, () => console.warn( 'Listening on port', port ) )
}
else
  module.exports = app
