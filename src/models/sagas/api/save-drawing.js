import axios from 'axios'
import { ROOT_URL } from './index'

export async function saveDrawing ( payload ) {
//   const {
//     id,
//     user,
//     isPrivate,
//     creationDateTime,
//     elapsedTime,
//     history,
//     thumbnail
//   } = payload
  const headers = { authorization: localStorage.getItem( 'token' ) }

  const res = await axios.post( `${ROOT_URL}/drawing`, payload, { headers } )

  return res.data
}