import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import auth from './auth'
import user from './user'
import drawing from './drawing'
import year from './year'

export default combineReducers( {
  auth,
  user,
  drawing,
  year,
  form: formReducer
} )