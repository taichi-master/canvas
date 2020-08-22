import { all } from 'redux-saga/effects'

import watchGetPostsByUser from './postsByUser'
import watchCommentsByPost from './commentsByPost'
import watchSignIn from './sign-in'
import watchSignUp from './sign-up'

export default function* rootSaga () {
  yield all( [
    watchSignIn(),
    watchSignUp(),
    watchGetPostsByUser(),
    watchCommentsByPost()
  ] )
}