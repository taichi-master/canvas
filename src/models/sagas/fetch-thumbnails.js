import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { FETCH_THUMBNAILS, FETCH_THUMBNAILS_SUCCESS, FETCH_THUMBNAILS_FAILURE } from '../action-types'

function* fetchThumbnails ( action ) {
  try {
    const thumbnails = yield call( api.fetchThumbnails, action.user )

    yield put( { type: FETCH_THUMBNAILS_SUCCESS, thumbnails } )

  } catch ( error ) {
    yield put( { type: FETCH_THUMBNAILS_FAILURE, error } )
  }
}

export default function* watchSaveDrawing () {
  yield takeEvery( FETCH_THUMBNAILS, fetchThumbnails )
}
