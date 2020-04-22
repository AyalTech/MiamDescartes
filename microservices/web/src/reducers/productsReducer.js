import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_FULFILLED,
  FETCH_PRODUCTS_ERROR,
} from '../constants/actionTypes';

const initialState = {
  fetching: false,
  fetched: false,
  success: false,
  products: [],
};

export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCTS:
      return {
        ...state,
        fetching: true,
      };
    case FETCH_PRODUCTS_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        products: action.products,
        success: true,
      };
    case FETCH_PRODUCTS_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: true,
      };
    default:
      return state;
  }
}
