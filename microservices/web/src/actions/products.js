import axios from 'axios';
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FULFILLED,
  FETCH_PRODUCTS_ERROR,
} from '../constants/actionTypes';
import { clearErrors, returnErrors } from './errorActions';
import { apiOrder } from '../constants/api';

export const fetchProducts = () => (dispatch) => {
  dispatch(clearErrors());

  dispatch({ type: FETCH_PRODUCTS });

  return axios.get(`${apiOrder}/products`)
    .then((response) => dispatch({ type: FETCH_PRODUCTS_FULFILLED, products: response.data }))
    .catch((err) => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'PRODUCTS_FAIL'),
      );
      dispatch({ type: FETCH_PRODUCTS_ERROR });
    });
};
