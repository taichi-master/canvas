import { all } from 'redux-saga/effects'

import watchSignIn from './sign-in'
import watchSignUp from './sign-up'
import watchSaveDrawing from './save-drawing'
import watchGetDrawing from './get-drawing'
import watchRemoveDrawing from './remove-drawing'
import watchFetchThumbnails from './fetch-thumbnails'

export default function* rootSaga () {
  yield all( [
    watchSignIn(),
    watchSignUp(),
    watchSaveDrawing(),
    watchGetDrawing(),
    watchRemoveDrawing(),
    watchFetchThumbnails()
  ] )
}