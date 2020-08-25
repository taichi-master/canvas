import axios from 'axios'
import { ROOT_URL } from './index'

export async function removeDrawing ( id ) {
  const headers = { authorization: localStorage.getItem( 'token' ) }

  const res = await axios.delete( `${ROOT_URL}/drawing/${id}`, { headers } )

  return res.data
}