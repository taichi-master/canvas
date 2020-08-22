import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { SIGN_IN, AUTH_USER, SET_USER } from 'models/action-types'
import { authUser, authError } from 'models/actions'

function* signIn ( action ) {
  try {
    const { auth, callback } = action.payload,
          user = yield call( api.signIn, auth )

    // If request is good...
    // - Update state to indicate user is 
    yield put( authUser() )

    // - Save the JWT token
    localStorage.setItem( 'token', user.token )

    // set user info
    yield put( { type: SET_USER, user } )

    callback()

    // return token

  } catch ( error ) {
    yield put( authError( 'Bad Login Info' ) )
  }
}

export default function* watchSignIn () {
  yield takeEvery( SIGN_IN, signIn )
}