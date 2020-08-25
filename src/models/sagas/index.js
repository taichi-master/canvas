import { all } from 'redux-saga/effects'

import watchSignIn from './sign-in'
import watchSignUp from './sign-up'
import watchSaveDrawing from './save-drawing'
import watchFetchThumbnails from './fetch-thumbnails'

export default function* rootSaga () {
  yield all( [
    watchSignIn(),
    watchSignUp(),
    watchSaveDrawing(),
    watchFetchThumbnails()
  ] )
}