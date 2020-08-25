import * as types from 'models/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  error: '',

  drawings: []
}

export default ( thumbnails = initState, action ) => {
  switch ( action.type ) {

  case types.FETCH_THUMBNAILS:
    return { ...thumbnails, isFetching: true, didInvalidate: false }
  
  case types.FETCH_THUMBNAILS_SUCCESS:
    return { ...thumbnails, isFetching: false, drawings: action.thumbnails }
  
  case types.FETCH_THUMBNAILS_FAILURE:
    return { ...thumbnails, isFetching: false, didInvalidate: true, error: action.error }
  
  default:
    return thumbnails
  }
}