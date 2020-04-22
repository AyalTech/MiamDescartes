import React from 'react';
import Proptypes from 'prop-types';

import './App.less';

import { Layout } from 'antd';
import HeaderPerso from '../../components/_organisms/Header/header';
import FooterPerso from '../../components/_organisms/Footer/footer';

class App extends React.Component {
  componentDidMount() {
    const { loadUser } = this.props;
    loadUser();
  }

  render() {
    const { children, auth, logout } = this.props;
    return (
      <Layout className="root">
        <HeaderPerso auth={auth} logout={logout} />
        <main>
          {children}
        </main>
        <FooterPerso />
      </Layout>
    );
  }
}

App.propTypes = {
  children: Proptypes.node,
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
  loadUser: Proptypes.func,
};

App.defaultProps = {
  children: null,
  auth: {},
  logout: () => {},
  loadUser: () => {},
};

export default App;
