import axios from 'axios'
import { ROOT_URL } from './index'

export async function fetchThumbnails ( user ) {
  const res = await axios.get( `${ROOT_URL}/thumbnails/` + ( user || '' ) )

  return res.data
}