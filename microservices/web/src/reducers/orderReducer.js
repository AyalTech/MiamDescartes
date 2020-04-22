import {
  FETCH_ORDERS,
  FETCH_ORDERS_USER_FULFILLED,
  FETCH_ORDERS_USER_ERROR,
  FETCH_ORDER_CREATE_USER_FULFILLED,
  FETCH_ORDER_CREATE_USER_ERROR,
  FETCH_ORDER_DELETE_FULFILLED,
  FETCH_ORDER_DELETE_ERROR,
  FETCH_ORDERS_TODAY_FULFILLED,
  FETCH_ORDERS_TODAY_ERROR,
  FETCH_ORDER_DELETE_ADMIN_FULFILLED,
  FETCH_ORDERS_DAY_ERROR, FETCH_ORDERS_DAY_FULFILLED,
} from '../constants/actionTypes';

const initialState = {
  fetching: false,
  fetched: false,
  orders: {},
  ordersToday: {},
  ordersDate: {},
  order: {},
};

export default function orderReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ORDERS:
      return {
        ...state,
        fetching: true,
        orders: {},
        ordersToday: {},
        ordersDate: {},
        order: {},
      };
    case FETCH_ORDERS_USER_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        orders: action.payload,
      };
    case FETCH_ORDERS_TODAY_FULFILLED:
    case FETCH_ORDERS_DAY_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        ordersDate: action.payload,
      };
    case FETCH_ORDER_DELETE_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        orders: state.orders.orders.filter((item) => item.id !== action.payload),
      };
    case FETCH_ORDER_DELETE_ADMIN_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        ordersToday: state.ordersToday.orders.filter((item) => item.id !== action.payload),
      };
    case FETCH_ORDER_CREATE_USER_FULFILLED:
      return {
        ...state,
        fetching: false,
        fetched: true,
        order: action.payload,
      };
    case FETCH_ORDERS_USER_ERROR:
    case FETCH_ORDER_DELETE_ERROR:
    case FETCH_ORDER_CREATE_USER_ERROR:
    case FETCH_ORDERS_TODAY_ERROR:
    case FETCH_ORDERS_DAY_ERROR:
      return {
        ...state,
        fetching: false,
        fetched: true,
        orders: {},
        order: {},
        ordersToday: {},
        ordersDate: {},
      };
    default:
      return state;
  }
}
