import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { REMOVE_DRAWING, REMOVE_DRAWING_SUCCESS, REMOVE_DRAWING_FAILURE } from 'models/action-types'

function* removeDrawing ( action ) {
  try {
    const drawing = yield call( api.removeDrawing, action.id )

    yield put( { type: REMOVE_DRAWING_SUCCESS, drawing } )

  } catch ( error ) {
    yield put( { type: REMOVE_DRAWING_FAILURE, error } )
  }
}

export default function* watchRemoveDrawing () {
  yield takeEvery( REMOVE_DRAWING, removeDrawing )
}
