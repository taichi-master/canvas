import axios from 'axios'
import { ROOT_URL } from './index'

export async function signIn ( auth ) {
  const res = await axios.post( `${ROOT_URL}/auth/signin`, auth )

  return res.data
}