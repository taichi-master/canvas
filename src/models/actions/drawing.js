import { SAVE_DRAWING, GET_DRAWING, REMOVE_DRAWING } from 'models/action-types'

export const saveDrawing = payload => ( { type: SAVE_DRAWING, payload } )

export const getDrawing = id => ( { type: GET_DRAWING, id } )

export const removeDrawing = id => ( { type: REMOVE_DRAWING, id } )