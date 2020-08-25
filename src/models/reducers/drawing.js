import * as types from 'models/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  backendError: '',

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
    return { ...drawing, backendError: action.error }

  case types.GET_DRAWING:
    return { ...drawing, isFetching: true, didInvalidate: false }
  
  case types.SAVE_DRAWING_SUCCESS:
    return { ...drawing, isFetching: false, didInvalidate: false, data: action.comments }
  
  case types.SAVE_DRAWING_FAILURE:
    return { ...drawing, isFetching: false, didInvalidate: true, data: [] }

  default:
    return drawing
  }
}

// export const GET_DRAWING = Symbol( 'GET_DRAWING' )
// export const GET_DRAWING_SUCCESS = Symbol( 'GET_DRAWING_SUCCESS' )
// export const GET_DRAWING_FAILURE = Symbol( 'GET_DRAWING_FAILURE' )
