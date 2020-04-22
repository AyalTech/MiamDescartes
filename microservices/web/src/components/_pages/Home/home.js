import React from 'react';
import Proptypes from 'prop-types';
import './home.less';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { columnListProducts } from '../../../constants/columnListProducts';

class Home extends React.Component {

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    const { auth, products } = this.props;
    return (
      <>
        <div className="container-home">
          <div className="banner">
            <article>
              {
              auth.isAuthenticated ? (
                <h2 className="title-picture">
                  {`Bienvenue ${auth.user.user.lastName} ${auth.user.user.firstName} vous êtes prêt à `}
                  <Link to="/order" className="title-picture-link"> commander !</Link>
                </h2>
              ) : (
                <h2 className="title-picture">
                  Pour pouvoir commander il faut se
                  <Link to="/login" className="title-picture-link"> connecter !</Link>
                </h2>
              )
            }
              <h3 className="subtitle-picture">
                <a href="https://image.noelshack.com/fichiers/2019/43/3/1571860969-carte.jpg" className="subtitle-picture" target="_blank" rel="noopener noreferrer">Voir la Carte ...</a>
              </h3>
            </article>
          </div>
          {
                products !== [] && (
                  <>
                    <article className="carte-article">
                      <h1 className="carte-title">Menu</h1>
                      <Table columns={columnListProducts} dataSource={products} />
                    </article>
                  </>
                )
              }
        </div>
      </>
    );
  }
}

Home.propTypes = {
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
  products: Proptypes.arrayOf(Proptypes.object),
  fetchProducts: Proptypes.func,
};

Home.defaultProps = {
  auth: {},
  fetchProducts: () => {},
  products: [],
};

export default Home;
