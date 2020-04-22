import axios from 'axios';
import { clearErrors, returnErrors } from './errorActions';
import { apiUser } from '../constants/api';
import {
  FETCH_SIGNUP,
  FETCH_SIGNUP_FULFILLED,
  FETCH_SIGNUP_ERROR,
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  FETCH_LOGIN_FULFILLED,
  FETCH_LOGIN_ERROR,
  FETCH_LOGIN,
  LOGOUT_SUCCESS,
  FORGET_PASSWORD,
  FORGET_PASSWORD_FULFILLED,
  FORGET_PASSWORD_ERROR,
} from '../constants/actionTypes';

// Setup config/headers and token
export const tokenConfig = (getState) => {
  // Get token from localstorage
  const { token } = getState().auth;

  // Headers
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };

  // If token, add to headers
  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
  dispatch(clearErrors());
  // User loading
  dispatch({ type: USER_LOADING });

  axios
    .get(`${apiUser}/user`, tokenConfig(getState))
    .then((res) => {
      dispatch(clearErrors());
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// Register User
export const register = ({
  firstName,
  lastName,
  email,
  password,
  confirmPassword,
}) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch(clearErrors());

  dispatch({ type: FETCH_SIGNUP });

  // Request body
  const body = JSON.stringify({
    firstName, lastName, email, password, confirmPassword,
  });
  axios
    .post(`${apiUser}/auth`, body, config)
    .then((res) => dispatch({
      type: FETCH_SIGNUP_FULFILLED,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'),
      );
      dispatch({
        type: FETCH_SIGNUP_ERROR,
      });
    });
};

// Login User
export const login = ({ email, password }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch(clearErrors());

  dispatch({ type: FETCH_LOGIN });

  // Request body
  const body = JSON.stringify({ email, password });

  axios
    .post(`${apiUser}/login`, body, config)
    .then((res) => {
      return dispatch({
        type: FETCH_LOGIN_FULFILLED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'),
      );
      dispatch({
        type: FETCH_LOGIN_ERROR,
      });
    });
};

// ForgetPassword
export const forgetPassword = ({ email, password, confirmPassword }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  dispatch(clearErrors());

  dispatch({ type: FORGET_PASSWORD });

  // Request body
  const body = JSON.stringify({ email, password, confirmPassword });

  axios
    .post(`${apiUser}/login/forgetPassword`, body, config)
    .then((res) => dispatch({
      type: FORGET_PASSWORD_FULFILLED,
      payload: res.data,
    }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'FORGET_PASSWORD_FAIL'),
      );
      dispatch({
        type: FORGET_PASSWORD_ERROR,
      });
    });
};

// Logout User
export const logout = () => ({
  type: LOGOUT_SUCCESS,
});
