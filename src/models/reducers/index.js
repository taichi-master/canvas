import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import user from './user'
import comments from './comments'
import posts from './posts'
import year from './year'

export default combineReducers( {
  auth,
  user,
  form: formReducer,
  comments,
  posts,
  year
} )