import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loadState } from './localStorage';
import rootReducer from '../reducers';

const persistedStore = loadState();
const middleware = applyMiddleware(promise, thunk);

const store = createStore(
  rootReducer,
  persistedStore,
  composeWithDevTools(middleware),
);

export default store;
