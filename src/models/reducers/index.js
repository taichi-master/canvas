import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import user from './user'
import drawing from './drawing'
import listing from './listing'
import year from './year'

export default combineReducers( {
  auth,
  user,
  drawing,
  listing,
  year,
  form: formReducer
} )