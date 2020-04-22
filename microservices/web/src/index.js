import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// CSS
import 'antd/dist/antd.less';
import './index.css';

import AppRoutes from './routes';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route component={AppRoutes} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
