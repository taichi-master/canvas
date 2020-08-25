import axios from 'axios'
import { ROOT_URL } from './index'

export async function fetchListing ( user ) {
  const res = await axios.get( `${ROOT_URL}/listing/` + ( user || '' ) )

  return res.data
}