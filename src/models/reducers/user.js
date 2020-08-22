import { SET_USER, FETCH_USER, UPDATE_USER } from 'models/action-types'

export default function ( user = {}, action ) {
  switch ( action.type ) {
  case FETCH_USER:
  case SET_USER:
    return action.user
  case UPDATE_USER:
  default:
    return user
  }
}