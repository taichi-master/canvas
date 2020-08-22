import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

import * as actions from 'models/actions'

class SignOut extends React.PureComponent {
  componentWillMount() {
    this.props.signoutUser();
  }
  
  render () {
    return (
      <div>Sign out successfully</div>
    )
  }
}

export default connect(null, actions)(SignOut);