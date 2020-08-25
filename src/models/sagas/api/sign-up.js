import axios from 'axios'
import { ROOT_URL } from './index'

export async function signUp ( auth ) {
  const res = await axios.post( `${ROOT_URL}/auth/signup`, auth )

  return res.data
}