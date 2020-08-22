import axios from 'axios'

// import * as types from 'models/actionTypes'
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, SET_USER, UPDATE_USER, FETCH_USER } from 'models/action-types'

// const ROOT_URL = 'http://localhost:3090';
const ROOT_URL = '/api/auth';

export function signupUser ({ email, password }, callback) {
  return function (dispatch, getState) {
    // Sumbit email/password to server
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(res => {
        dispatch({type: AUTH_USER});
        localStorage.setItem('token', res.data.token);
        // dispatch({type: FETCH_USER});
        // localStorage.setItem('userId', res.data.id);
        // localStorage.setItem('userName', email);
        callback();
      })
      .catch((err) => {
        dispatch(authError(err.response.data.error));
      });
  }
}

export function signinUser ({ email, password }, callback) {
  return function (dispatch, getState) {
    // Sumbit email/password to server
    axios.post(`${ROOT_URL}/signin`, {email, password})
      .then(res => {
        // If request is good...
        // - Update state to indicate user is 
        dispatch({type: AUTH_USER});
        // - Save the JWT token
        localStorage.setItem('token', res.data.token);
        // get user info
        dispatch({type: SET_USER, user: res.data});
        callback();
      })
      .catch((err) => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signoutUser () {
  localStorage.removeItem('token');
  return {type: UNAUTH_USER};
}

export function updateUser (values, callback) {
  const headers = { authorization: localStorage.getItem('token') };
  const req = axios.put('/api/user/', values, {headers})
                .then((res) => {
                  console.log(res.status);
                  callback()
                });
  return {
    type: UPDATE_USER,
    payload: req
  }
}

export function getUser (id) {
  const headers = { authorization: localStorage.getItem('token') };
  const req = axios.get(`/api/user/${id}`, {headers});
  return {
    type: FETCH_USER,
    payload: req
  }
}