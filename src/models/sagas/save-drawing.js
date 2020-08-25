import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { SAVE_DRAWING, SAVE_DRAWING_SUCCESS, SAVE_DRAWING_FAILURE } from 'models/action-types'

function* saveDrawing ( action ) {
  try {
    const { id, lastSaved } = yield call( api.saveDrawing, action.payload )

    yield put( { type: SAVE_DRAWING_SUCCESS, id, lastSaved } )

  } catch ( error ) {
    yield put( { type: SAVE_DRAWING_FAILURE, error } )
  }
}

export default function* watchSaveDrawing () {
  yield takeEvery( SAVE_DRAWING, saveDrawing )
}
