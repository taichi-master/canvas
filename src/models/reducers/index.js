import { combineReducers } from 'redux'

import auth from './auth'
import comments from './comments'
import posts from './posts'
import year from './year'

export default combineReducers( {
  auth,
  comments,
  posts,
  year
} )