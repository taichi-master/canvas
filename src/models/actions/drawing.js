import { FETCH_LISTING, GET_DRAWING, SAVE_DRAWING, REMOVE_DRAWING } from 'models/action-types'

export const fetchListing = user => ( { type: FETCH_LISTING, user } )

export const getDrawing = id => ( { type: GET_DRAWING, id } )

export const saveDrawing = payload => ( { type: SAVE_DRAWING, payload } )

export const removeDrawing = id => ( { type: REMOVE_DRAWING, id } )