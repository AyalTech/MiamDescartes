import React from 'react';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import {
  Button, Card, Col, Icon, Row, message, Input, Radio,
} from 'antd';
import './order.less';

import { strUcFirst } from '../../../helpers/string';

const { Search } = Input;

class Order extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredProducts: undefined,
    };
    this.handleAddOrder = this.handleAddOrder.bind(this);
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
    this.componentDidUpdate();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { products } = this.props;
    const { filteredProducts } = this.state;
    if (!filteredProducts && products.length > 0) {
      this.setState({
        filteredProducts: products,
      });
    }
  }

  handleAddOrder = (title) => {
    const { addOrderUser } = this.props;
    message.success(`Le produit ${title} a bien été ajouté à votre commande !`);
    addOrderUser(title);
  }

  handleSearch = (event) => {
    const { target } = event;
    const { products } = this.props;
    if (target) {
      const search = target.value.trim().toLowerCase();
      const filteredProductsLocal = products.filter((product) => product.title.toLowerCase().indexOf(search) !== -1);
      this.setState({
        filteredProducts: filteredProductsLocal,
      });
    }
  }

  handleFilter = (event) => {
    const { target } = event;
    const { products } = this.props;
    if (target) {
      if (target.value === '') {
        this.setState({
          filteredProducts: products,
        });
      } else {
        const search = target.value.trim().toLowerCase();
        const filteredProductsLocal = products.filter((product) => product.category.toLowerCase() === search);
        this.setState({
          filteredProducts: filteredProductsLocal,
        });
      }
    }
  }

  render() {
    const { isAuthenticated } = this.props;
    const { filteredProducts } = this.state;
    return (
      <>
        {
          !isAuthenticated && (
            <Redirect to="/erreur/no-connected" />
          )
        }
        {
          filteredProducts && (
            <div style={{ padding: '30px' }}>
              <div className="filter">
                <Radio.Group onChange={this.handleFilter} defaultValue="">
                  <Radio.Button value="" className="filter-btn">Tout les produits</Radio.Button>
                  <Radio.Button value="sandwich" className="filter-btn">Sandwich</Radio.Button>
                  <Radio.Button value="bagel" className="filter-btn">Bagel</Radio.Button>
                  <Radio.Button value="riz_tartare" className="filter-btn">Riz tartare</Radio.Button>
                  <Radio.Button value="riz_saute" className="filter-btn">Riz sauté</Radio.Button>
                  <Radio.Button value="california" className="filter-btn">California</Radio.Button>
                  <Radio.Button value="salade" className="filter-btn">Salade</Radio.Button>
                  <Radio.Button value="autre" className="filter-btn">Autre</Radio.Button>
                </Radio.Group>
              </div>
              <Search
                placeholder="Rechercher un produit"
                onChange={this.handleSearch}
              />
              <Row gutter={16}>
                {
                  filteredProducts.map((product) => (
                    <Col className="col" xs={32} sm={12} lg={8} key={product.id}>
                      <Card title={strUcFirst(product.title)} bordered={false}>
                        <span className="card-price">{`Prix: ${product.price} €`}</span>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Button className="card-button" onClick={this.handleAddOrder.bind(this, product.title)}><Icon type="plus" /></Button>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
          )
    }
      </>
    );
  }
}

Order.propTypes = {
  fetchProducts: Proptypes.func,
  products: Proptypes.arrayOf(Proptypes.object),
  addOrderUser: Proptypes.func,
  isAuthenticated: Proptypes.bool,
};

Order.defaultProps = {
  fetchProducts: () => {},
  products: [],
  addOrderUser: () => {},
  isAuthenticated: true,
};

export default Order;
