import React from 'react';
import Proptypes from 'prop-types';

import './header.less';

import {
  Layout, Icon, Typography,
} from 'antd';

const { Header } = Layout;
const { Text } = Typography;

class HeaderPerso extends React.Component {
  toggleCollapsed = () => {
    const { setIsCollapsed, isCollapsed } = this.props;
    setIsCollapsed(!isCollapsed);
  };

  render() {
    const { text, isCollapsed } = this.props;
    return (
      <Layout>
        <Header className="headerPerso">
          <Icon
            className="trigger"
            type={isCollapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggleCollapsed}
          />
          <Text className="title">{text}</Text>
        </Header>
      </Layout>
    );
  }
}

HeaderPerso.propTypes = {
  isCollapsed: Proptypes.bool,
  setIsCollapsed: Proptypes.func,
  text: Proptypes.string,
};

HeaderPerso.defaultProps = {
  isCollapsed: false,
  text: '',
  setIsCollapsed: () => null,
};


export default HeaderPerso;
