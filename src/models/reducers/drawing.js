import * as types from 'models/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  error: '',

  id: null,
  isPrivate: false,
  creationDateTime: null,
  lastSaved: null,
  elapsedTime: 0,
  history: []
  // thumbnail is for save only
}

export default ( drawing = initState, action ) => {
  switch ( action.type ) {
  case types.SAVE_DRAWING_SUCCESS:
    return { ...drawing, id: action.id, lastSaved: action.lastSaved }

  case types.SAVE_DRAWING_FAILURE:
    return { ...drawing, error: action.error }

  case types.GET_DRAWING:
    return { ...drawing, isFetching: true, didInvalidate: false, id: action.id }
  
  case types.GET_DRAWING_SUCCESS:
    return { ...drawing, isFetching: false, didInvalidate: false, ...action.drawing }
  
  case types.GET_DRAWING_FAILURE:
    return { ...drawing, isFetching: false, didInvalidate: true, error: action.error }

  case types.REMOVE_DRAWING_SUCCESS:
    return { ...drawing }
    
  case types.REMOVE_DRAWING_FAILURE:
    return { ...drawing, error: action.error }
  
  default:
    return drawing
  }
}