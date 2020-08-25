import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from './api'
import { GET_DRAWING, GET_DRAWING_SUCCESS, GET_DRAWING_FAILURE } from 'models/action-types'

function* getDrawing ( action ) {
  try {
    const drawing = yield call( api.getDrawing, action.id )

    yield put( { type: GET_DRAWING_SUCCESS, drawing } )

  } catch ( error ) {
    yield put( { type: GET_DRAWING_FAILURE, error } )
  }
}

export default function* watchGetDrawing () {
  yield takeEvery( GET_DRAWING, getDrawing )
}
