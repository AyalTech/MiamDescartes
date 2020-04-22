import { combineReducers } from 'redux';

import headerReducer from './headerReducer';
import productReducer from './productsReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import orderReducer from './orderReducer';

const rootReducer = combineReducers({
  header: headerReducer,
  error: errorReducer,
  products: productReducer,
  auth: authReducer,
  orders: orderReducer,
});

export default rootReducer;
