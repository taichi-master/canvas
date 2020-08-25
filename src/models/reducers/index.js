import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import user from './user'
import drawing from './drawing'
import thumbnails from './thumbnails'
import year from './year'

export default combineReducers( {
  auth,
  user,
  drawing,
  thumbnails,
  year,
  form: formReducer
} )