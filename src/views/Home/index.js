import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { fetchListing } from 'models/actions'

import "./style.scss"

// console.log( 'load Home' )

const getUrl = ( id, user, currentUser ) => ( user === currentUser ? `/canvas/${id}` : '' )

function Thumbnail ( props ) {
  const { drawing : { id, user, thumbnail }, currentUserId } = props

  return (
    <div className="item">
      <Link to={ getUrl( id, user, currentUserId ) }>
        <img src={ thumbnail } />
      </Link>
    </div>
  )
}

@connect( ( { listing, user } ) => ( { listing, user } ), { fetchListing } )
export default class Home extends React.Component {
  constructor ( props ){
    super( props )

    this.state = {}
  }

  componentDidMount () {
    this.props.fetchListing()
  }

  componentWillUnmount () {
  }

  static getDerivedStateFromProps ( props, state ) {
    return null
  }

  getUrl = ( drawing ) => {
    const { id, user } = drawing

    return user === this.props.user.id ? `/canvas/${id}` : ''
  }

  render () {
    const { isFetching, drawings } = this.props.listing
    const { id: userId } = this.props.user

    return (
      <div className="home">
        <div className="listing">
          {
            isFetching ? 'Loading...' :

              drawings.map( ( drawing, i ) => <Thumbnail drawing={ drawing } currentUserId={ userId } key={ i } /> )
          }
        </div>
      </div>
    )
  }
}