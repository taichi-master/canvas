import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { SIGN_UP, SET_USER } from 'models/action-types'
import { authUser, authError } from 'models/actions'

function* signUp ( action ) {
  try {
    const { auth, callback } = action.payload,
          user = yield call( api.signUp, auth )

    // If request is good...
    // - Update state to indicate user is 
    yield put( authUser() )

    // - Save the JWT token
    localStorage.setItem( 'token', user.token )

    // set user info
    yield put( { type: SET_USER, user } )

    callback()

  } catch ( error ) {
    yield put( authError( error.message ) )
  }
}

export default function* watchSignUp () {
  yield takeEvery( SIGN_UP, signUp )
}