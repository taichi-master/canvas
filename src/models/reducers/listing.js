import * as types from 'models/action-types'

const initState = {
  isFetching: false,
  didInvalidate: false,
  error: '',

  drawings: []
}

export default ( listing = initState, action ) => {
  switch ( action.type ) {

  case types.FETCH_LISTING:
    return { ...listing, isFetching: true, didInvalidate: false }
  
  case types.FETCH_LISTING_SUCCESS:
    return { ...listing, isFetching: false, drawings: action.listing }
  
  case types.FETCH_LISTING_FAILURE:
    return { ...listing, isFetching: false, didInvalidate: true, error: action.error }
  
  default:
    return listing
  }
}