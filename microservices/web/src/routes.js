import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './components/_pages/Home/home.connect';
import Login from './components/_pages/Login/login.connect';
import SignUp from './components/_pages/SignUp/signup.connect';
import ForgetPassword from './components/_pages/ForgetPassword/forget-password.connect';
import Logout from './components/_pages/Logout/logout';
import Order from './components/_pages/Order/order.connect';
import MyOrders from './components/_pages/MyOrders/my-orders.connect';
import LoginSuccess from './components/_pages/LoginSuccess/login-success.connect';
import Erreur404 from './components/_pages/Erreur404/erreur404';
import NoConnected from './components/_pages/NoConnected/no-connected';
import Admin from './components/_pages/Admin/admin.connect';

import App from './containers/App/App.connect';

const AppRoutes = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <App {...props}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/forgetPassword" component={ForgetPassword} />
      <Route exact path="/logout" component={Logout} />
      <Route exact path="/order" component={Order} />
      <Route exact path="/my-orders" component={MyOrders} />
      <Route exact path="/login/success" component={LoginSuccess} />
      <Route exact path="/erreur/no-connected" component={NoConnected} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/error404" component={Erreur404} />
      <Route component={Home} />
    </Switch>
  </App>
);

export default AppRoutes;
