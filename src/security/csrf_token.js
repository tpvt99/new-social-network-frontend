import { CSRF_TOKEN_URL } from '../api/api.js'

// import {createCookie} from './cookie.js'

export function getcsrftoken (e) {
  e.$http({
    method: 'get',
    baseURL: CSRF_TOKEN_URL,
    withCredentials: true
  })
}
