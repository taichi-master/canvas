import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { FETCH_LISTING, FETCH_LISTING_SUCCESS, FETCH_LISTING_FAILURE } from '../action-types'

function* fetchListing ( action ) {
  try {
    const listing = yield call( api.fetchListing, action.user )

    yield put( { type: FETCH_LISTING_SUCCESS, listing } )

  } catch ( error ) {
    yield put( { type: FETCH_LISTING_FAILURE, error } )
  }
}

export default function* watchSaveDrawing () {
  yield takeEvery( FETCH_LISTING, fetchListing )
}
