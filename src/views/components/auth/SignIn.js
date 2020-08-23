import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import { Link } from 'react-router-dom'
import { withLastLocation } from 'react-router-last-location'

import * as actions from 'models/actions'

class SignIn extends React.PureComponent {
  states = {
    name: 'SignIn'
  }

  renderField ( field ) {
    // field.type || (field.type = 'text');
    return (
      <div className="control-group">
        <label>{ field.label }</label>
        <input
          type={ field.type }
          { ...field.input }
        />
        {
          field.meta.touched ? field.meta.error : null
        }
      </div>
    )
  }

  renderAlert () {
    if ( this.props.errorMessage ) {
      return (
        <div>
          <strong>Oops!</strong> { this.props.errorMessage }
        </div>
      )
    }
  }

  onSubmit = ( { email, password } ) => {
    const { signinUser, history, lastLocation } = this.props

    signinUser( { email, password }, () => {
      switch ( lastLocation.pathname ) {
      case '/signin':
      case '/signout':
        history.push( '/' )
        break
      default:
        history.goBack()
        break
      }
    } )
  }

  render () {
    // const { handleSubmit, fields: { email, password } } = this.props;
    const { handleSubmit } = this.props

    return (
      <div className="sign-in">
        <h1>Sign In</h1>
        <form onSubmit={ handleSubmit( this.onSubmit ) }>
          <Field label="Email" name="email" component={ this.renderField } type="text" />
          <Field label="Password" name="password" component={ this.renderField } type="password" />
          {
            this.renderAlert()
          }
          <button action="submit">Sign In</button>
          <p>or</p>
          <Link to="/signup">Sign Up</Link>        
        </form>
      </div>
    )
  }
}

function validate ( values, props ) {
  const errors = {}

  return errors
}

SignIn = withLastLocation( SignIn )

SignIn = reduxForm( {
  form: 'SignInForm',
  enableReinitialize: true,
  validate
} )( SignIn )

SignIn = connect( ( { auth } ) => ( {
  errorMessage: auth.error
} ), actions )( SignIn )

export default SignIn
