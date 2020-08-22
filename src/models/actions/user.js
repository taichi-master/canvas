import axios from 'axios'

import { SET_USER, FETCH_USER, UPDATE_USER } from 'models/action-types'

export const setUser = user => ( { type: SET_USER, user } )

export const fetchUser = id => ( { type: FETCH_USER, payload: axios.get( `/api/user/${id}` ) } )

export const updateUser = ( user, callback ) => {
  const headers = { authorization: localStorage.getItem( 'token' ) }
  const req = axios.put( '/api/user/', user, { headers } )
    .then( ( res ) => {
      callback()
    } )

  return {
    type: UPDATE_USER,
    payload: req
  }
}
