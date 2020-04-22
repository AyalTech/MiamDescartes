import axios from 'axios';
import { tokenConfig } from './auth';
import {
  FETCH_ORDERS,
  FETCH_ORDERS_USER_FULFILLED,
  FETCH_ORDERS_USER_ERROR,
  FETCH_ORDER_DELETE_FULFILLED,
  FETCH_ORDER_DELETE_ERROR,
  FETCH_ORDER_CREATE_USER_FULFILLED,
  FETCH_ORDER_CREATE_USER_ERROR,
  FETCH_ORDERS_TODAY_FULFILLED,
  FETCH_ORDERS_TODAY_ERROR,
  FETCH_ORDERS_DAY_FULFILLED,
  FETCH_ORDERS_DAY_ERROR,
  FETCH_ORDER_DELETE_ADMIN_FULFILLED,
} from '../constants/actionTypes';
import { apiOrder } from '../constants/api';
import { clearErrors, returnErrors } from './errorActions';

export const loadUserOrders = () => (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_ORDERS });

  return axios.get(`${apiOrder}/order/user`, tokenConfig(getState))
    .then((response) => dispatch({ type: FETCH_ORDERS_USER_FULFILLED, payload: response.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ORDER_USER_FAIL'),
      );
      dispatch({ type: FETCH_ORDERS_USER_ERROR });
    });
};

export const loadOrdersToday = () => (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_ORDERS });

  return axios.get(`${apiOrder}/order/today`, tokenConfig(getState))
    .then((response) => dispatch({ type: FETCH_ORDERS_TODAY_FULFILLED, payload: response.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ORDERS_TODAY_'),
      );
      dispatch({ type: FETCH_ORDERS_TODAY_ERROR });
    });
};

export const loadOrdersDay = (month, day) => (dispatch, getState) => {
  dispatch(clearErrors());
  dispatch({ type: FETCH_ORDERS });

  const body = JSON.stringify({
    month, day,
  });

  return axios.post(`${apiOrder}/order/date`, body, tokenConfig(getState))
    .then((response) => dispatch({ type: FETCH_ORDERS_DAY_FULFILLED, payload: response.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ORDERS_DATE_FAIL'),
      );
      dispatch({ type: FETCH_ORDERS_DAY_ERROR });
    });
};

export const deleteUserOrder = (id) => (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_ORDERS });
  return axios.delete(`${apiOrder}/order/${id}`, tokenConfig(getState))
    .then(() => dispatch({ type: FETCH_ORDER_DELETE_FULFILLED, payload: id }))
    .catch(() => {
      dispatch(
        returnErrors(null, null, 'ORDER_USER_DELETE_FAIL'),
      );
      dispatch({ type: FETCH_ORDER_DELETE_ERROR });
    });
};

export const deleteUserOrderToday = (id) => (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_ORDERS });
  return axios.delete(`${apiOrder}/order/${id}`, tokenConfig(getState))
    .then(() => dispatch({ type: FETCH_ORDER_DELETE_ADMIN_FULFILLED, payload: id }))
    .catch(() => {
      dispatch(
        returnErrors(null, null, 'ORDER_USER_TODAY_DELETE_FAIL'),
      );
      dispatch({ type: FETCH_ORDER_DELETE_ERROR });
    });
};

export const addOrderUser = (title) => (dispatch, getState) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_ORDERS });
  // Request body
  const body = JSON.stringify({
    title,
  });


  axios.post(`${apiOrder}/order`, body, tokenConfig(getState))
    .then((res) => dispatch({
      type: FETCH_ORDER_CREATE_USER_FULFILLED,
      payload: res.data,
    }))

    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'ORDER_USER_CREATE_FAIL'),
      );
      dispatch({ type: FETCH_ORDER_CREATE_USER_ERROR });
    });
};
