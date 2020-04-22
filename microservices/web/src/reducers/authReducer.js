import {
  FETCH_SIGNUP,
  FETCH_SIGNUP_FULFILLED,
  FETCH_SIGNUP_ERROR,
  FETCH_LOGIN,
  FETCH_LOGIN_FULFILLED,
  FETCH_LOGIN_ERROR,
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR, LOGOUT_SUCCESS, FORGET_PASSWORD, FORGET_PASSWORD_FULFILLED, FORGET_PASSWORD_ERROR,
} from '../constants/actionTypes';

const initialState = {
  token: localStorage.getItem('token'),
  fetching: false,
  fetched: false,
  isLoading: false,
  isAuthenticated: null,
  isAdmin: false,
  user: null,
  msg: null,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case USER_LOADING:
      return {
        ...state,
        fetching: true,
        isLoading: true,
      };

    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        fetching: false,
        fetched: true,
        user: action.payload,
        isAdmin: action.payload.user.isAdmin,
      };

    case FETCH_LOGIN:
    case FETCH_SIGNUP:
    case FORGET_PASSWORD:
      return {
        ...state,
        fetching: true,
        isLoading: true,
      };

    case FETCH_LOGIN_FULFILLED:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        token: localStorage.getItem('token'),
        fetching: false,
        fetched: true,
        isAuthenticated: true,
        isAdmin: action.payload.user.isAdmin,
        user: action.payload,
        isLoading: false,
      };
    case FETCH_SIGNUP_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        msg: action.payload,
        isLoading: false,
      };
    case FORGET_PASSWORD_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        msg: action.payload,
        isLoading: false,
      };
    case FETCH_SIGNUP_ERROR:
    case AUTH_ERROR:
    case FETCH_LOGIN_ERROR:
    case FORGET_PASSWORD_ERROR:
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token');
      return {
        ...state,
        fetching: false,
        token: null,
        user: null,
        isAuthenticated: false,
        isAdmin: false,
        isLoading: false,
        msg: null,
      };
    default:
      return state;
  }
}
