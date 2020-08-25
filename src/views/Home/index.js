import React from 'react'
import { connect } from 'react-redux'
import { fetchThumbnails } from 'models/actions'
import Loading from 'components/loading'
import Thumbnail from 'components/thumbnail'

import "./style.scss"

// console.log( 'load Home' )

@connect( ( { thumbnails, user } ) => ( { thumbnails, user } ), { fetchThumbnails } )
export default class Home extends React.Component {
  constructor ( props ){
    super( props )

    this.state = {}
  }

  componentDidMount () {
    const { user } = this.props

    this.props.fetchThumbnails( user.id )
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
    const { isFetching, drawings } = this.props.thumbnails
    const { id: userId } = this.props.user

    return (
      <div className="home">
        <div className="thumbnails">
          {
            isFetching ? <Loading />
              : drawings.map( ( drawing, i ) => <Thumbnail drawing={ drawing } currentUserId={ userId } key={ i } /> )
          }
        </div>
      </div>
    )
  }
}