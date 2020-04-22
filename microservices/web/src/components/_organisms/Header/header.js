import React from 'react';
import { Layout } from 'antd';
import './header.less';
import MenuPerso from '../../_molecules/Menu/menu';

const { Header } = Layout;

const HeaderPerso = ({ auth, logout }) => (
  <Header className="header">
    <MenuPerso auth={auth} logout={logout} />
  </Header>
);

export default HeaderPerso;
