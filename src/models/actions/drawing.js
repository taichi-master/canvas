import { FETCH_LISTING, FETCH_DRAWING, SAVE_DRAWING, REMOVE_DRAWING } from 'models/action-types'

export const fetchListing = () => ( { type: FETCH_LISTING } )

export const fetchFromServer = id => ( { type: FETCH_DRAWING, id } )

export const postToServer = id => ( { type: SAVE_DRAWING, id } )

export const removeFromServer = id => ( { type: REMOVE_DRAWING, id } )
