// import * as types from 'models/actionTypes'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_USER, UPDATE_USER, FETCH_USER, SIGN_IN, SIGN_UP } from 'models/action-types'

// const ROOT_URL = 'http://localhost:3090';
// const ROOT_URL = '/api/auth'

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

// export function updateUser ( values, callback ) {
//   const headers = { authorization: localStorage.getItem( 'token' ) }
//   const req = axios.put( '/api/user/', values, { headers } )
//     .then( ( res ) => {
//       console.log( res.status )
//       callback()
//     } )

//   return {
//     type: UPDATE_USER,
//     payload: req
//   }
// }

// export function getUser ( id ) {
//   const headers = { authorization: localStorage.getItem( 'token' ) }
//   const req = axios.get( `/api/user/${id}`, { headers } )

//   return {
//     type: FETCH_USER,
//     payload: req
//   }
// }