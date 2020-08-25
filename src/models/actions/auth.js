// import * as types from 'models/actionTypes'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SIGN_IN, SIGN_UP } from 'models/action-types'

export const signupUser = ( auth, callback ) => ( { type: SIGN_UP, payload: { auth, callback } } )

export const signinUser = ( auth, callback ) => ( { type: SIGN_IN, payload: { auth, callback } } )

export const authUser = () => ( { type: AUTH_USER } )

export function authError ( error ) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem( 'token' )
  return { type: UNAUTH_USER }
}