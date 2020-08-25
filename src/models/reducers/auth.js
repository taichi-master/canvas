import { AUTH_USER, UNAUTH_USER, AUTH_ERROR } from 'models/action-types'

export default function ( auth = {}, action ) {
  switch ( action.type ) {
  case AUTH_USER:
    return { ...auth, authenticated: true, error: '' }
  case UNAUTH_USER:
    return { ...auth, authenticated: false, error: '' }
  case AUTH_ERROR:
    return { ...auth, error: action.payload }
  }
  return auth
}