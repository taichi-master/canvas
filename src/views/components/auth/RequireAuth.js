import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

export default function(ComposedComponent) {
  class Authentication extends React.PureComponent {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      const { authenticated, history } = this.props;
      this.props.authenticated || (this.props.history.push('/signin'));
    }

    componentWillUpdate(nextProps) {
      nextProps.authenticated || (this.props.history.push('/signin'));
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return connect(({ auth: { authenticated } }) => ({
    authenticated
  }))(Authentication);
}
