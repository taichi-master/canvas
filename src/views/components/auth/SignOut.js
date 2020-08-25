import React from 'react'
import { connect } from 'react-redux'

import * as actions from 'models/actions'

class SignOut extends React.PureComponent {
  componentWillMount () { // this cause "Warning: Cannot update a component from inside the function body of a different component."
    this.props.signoutUser()
    this.props.setUser( {} )
  }
  
  render () {
    return (
      <div>Sign out successfully</div>
    )
  }
}

export default connect( null, actions )( SignOut )