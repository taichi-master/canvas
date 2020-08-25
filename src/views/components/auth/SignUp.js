import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import * as actions from 'models/actions'

class SignUp extends React.PureComponent {

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

  onSubmit = ( { email, password, name } ) => {
    this.props.signupUser( { email, password, name }, () => {
      this.props.history.push( '/' )
    } )
  }

  render () {
    // const { handleSubmit, fields: { email, password } } = this.props;
    const { handleSubmit } = this.props

    return (
      <div className="sign-up">
        <h1>Register for New User</h1>
        <form onSubmit={ handleSubmit( this.onSubmit ) }>
          <Field label="Email" name="email" component={ this.renderField } type="text" />
          <Field label="Password" name="password" component={ this.renderField } type="password" />
          <Field label="Confirm Password" name="passwordConfirm" component={ this.renderField } type="password" />
          <Field label="name" name="name" component={ this.renderField } type="text" />
          {
            this.renderAlert()
          }
          <button action="submit">Submit</button>
        </form>
      </div>
    )
  }
}

function validate ( values, props ) {
  const errors = {}

  return errors
}

SignUp = reduxForm( {
  form: 'SignUpForm',
  enableReinitialize: true,
  validate
} )( SignUp )

SignUp = connect( ( { auth } ) => ( {
  errorMessage: auth.error
} ), actions )( SignUp )

export default SignUp
