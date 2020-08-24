import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { hot, setConfig } from 'react-hot-loader'
import Loadable from 'react-loadable'
import NavBar from 'components/nav-bar'
import FootLinks from 'components/foot-links'
import Loading from 'components/loading'
import Home from 'views/Home'
import Canvas from 'views/Canvas'
import NoMatch from 'views/404'

import SignUp from 'components/auth/SignUp'
import SignIn from 'components/auth/SignIn'
import SignOut from 'components/auth/SignOut'
import RequireAuth from 'components/auth/RequireAuth'

import { LastLocationProvider } from 'react-router-last-location'

const About = Loadable( {
  loader: () => import( 'views/About' ),
  loading: Loading
} )

if ( module.hot )
  setConfig( { logLevel: 'no-errors-please' } )

const App = () => (
  <LastLocationProvider>
    <header>
      <NavBar />
    </header>
    <article className="main-content">
      <Switch>
        <Route path="/" exact component={ Home } />
        <Route path="/signup" component={ SignUp } />
        <Route path="/signin" component={ SignIn } />
        <Route path="/signout" component={ SignOut } />
        <Route path="/canvas/:id?" component={ Canvas } />
        { /* <Route path="/canvas/id:?" component={ RequireAuth( Canvas ) } /> */ }
        <Route path="/about" component={ About } />
        <Route component={ NoMatch } />
      </Switch>
    </article>
    <footer className="footer">
      <div className="center">
        <FootLinks />
        <div className="clear"></div>
      </div>
    </footer>
  </LastLocationProvider>
)

export default module.hot ? hot( module )( App ) : App