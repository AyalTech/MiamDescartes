import React from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Menu } from 'antd';
import './menu.less';

class MenuPerso extends React.Component {
  render() {
    const { auth, logout } = this.props;
    const { Item } = Menu;

    return (
      <>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['home']}
          style={{ lineHeight: '64px' }}
          className="menu"
        >
          <Item key="home">
            <Link to="/">Accueil</Link>
          </Item>
          {
            auth.isAuthenticated == null || !auth.isAuthenticated
              ? (
                <Item key="signup">
                  <Link to="/signup">Inscription</Link>
                </Item>
              ) : (
                <Item key="order">
                  <Link to="/order">Commander</Link>
                </Item>
              )
          }
          {
            auth.isAuthenticated && (
              <Item key="myOrders">
                <Link to="/my-orders">Mes commandes</Link>
              </Item>
            )
          }
          {
            auth.isAdmin && (
              <Item key="admin">
                <Link to="/admin">Administration</Link>
              </Item>
            )
          }
          {
            auth.isAuthenticated == null || !auth.isAuthenticated ? (
              <Item key="login">
                <Link to="/login">Se connecter</Link>
              </Item>
            ) : (
              <Item key="login">
                <Link to="/logout" onClick={logout}>Se déconnecter</Link>
              </Item>
            )
          }
        </Menu>
      </>
    );
  }
}

MenuPerso.propTypes = {
  auth: Proptypes.shape({
    token: Proptypes.string,
    fetching: Proptypes.bool,
    fetched: Proptypes.bool,
    isLoading: Proptypes.bool,
    isAuthenticated: Proptypes.bool,
    isAdmin: Proptypes.bool,
    user: Proptypes.object,
    msg: Proptypes.shape({
      msg: Proptypes.string,
    }),
  }),
  logout: Proptypes.func,
};

MenuPerso.defaultProps = {
  auth: {},
  logout: () => {},
};

export default MenuPerso;
