import React from 'react'
import { Link } from 'react-router-dom'
import cx from 'classnames'

const getUrl = ( id, user, currentUser ) => ( user === currentUser ? `/canvas/${id}` : '' )

export default function Thumbnail ( props ) {
  const { drawing : { id, user, thumbnail }, currentUserId } = props

  return (
    <div className="thumbnail">
      <div className={ cx( 'thumbnail__frame', { 'thumbnail--owner': user === currentUserId } ) }>
        <Link to={ getUrl( id, user, currentUserId ) }>
          <img src={ thumbnail } />
        </Link>
      </div>
    </div>
  )
}
