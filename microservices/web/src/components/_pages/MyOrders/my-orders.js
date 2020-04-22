import React from 'react';
import Proptypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import {
  Button,
  Card, Col, Icon, Row, Result, Popconfirm, message,
} from 'antd';

import './my-orders.less';


import { strUcFirst, formatMonth } from '../../../helpers/string';

class MyOrders extends React.Component {
  componentDidMount() {
    const { loadUserOrders } = this.props;
    loadUserOrders();
  }

  handleDelete = async (id) => {
    const { orders } = this.props;
    console.log(orders);
    const { deleteUserOrder, loadUserOrders } = this.props;
    message.success('Ce produit de votre commande a bien été supprimé');
    await deleteUserOrder(id);
    await loadUserOrders();
  }

  cancel = () => {
    message.error('Le produit n\'a pas été supprimé de votre commande');
  }

  render() {
    const { orders, isAuthenticated } = this.props;
    const today = new Date();
    return (
      <>
        {
          !isAuthenticated && (
            <Redirect to="/erreur/no-connected" />
          )
        }
        {
          orders.length > 0 ? (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <h1 className="title">{`Vos commandes du ${today.getDate()} / ${formatMonth(today.getMonth())}`}</h1>
              <Row gutter={16}>
                {
                  orders.map((order) => (
                    <Col className="col" xs={32} sm={12} lg={8} key={order.id}>
                      <Card title={strUcFirst(order.Product.title)} bordered={false}>
                        <span className="card-price">{`Prix: ${order.Product.price} €`}</span>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Popconfirm
                          title={`${order.User.lastName} ${order.User.firstName} être vous sûr de vouloir supprimer cette commande ?`}
                          onConfirm={this.handleDelete.bind(this, order.id)}
                          onCancel={this.cancel}
                          okText="Oui"
                          cancelText="Non"
                        >
                          <Button className="card-button"><Icon type="close" /></Button>
                        </Popconfirm>
                      </Card>
                    </Col>
                  ))
                }
              </Row>
            </div>
          ) : (
            <>
              <Result
                status="warning"
                title="Vous n'avez effectué aucune commande aujourd'hui !"
                extra={(
                  <Button color="primary">
                    <Link to="/order">Commander !</Link>
                  </Button>
                  )}
              />
            </>
          )
}
      </>
    );
  }
}

MyOrders.propTypes = {
  orders: Proptypes.arrayOf(Proptypes.object),
  loadUserOrders: Proptypes.func,
  deleteUserOrder: Proptypes.func,
  isAuthenticated: Proptypes.bool,
};

MyOrders.defaultProps = {
  loadUserOrders: () => {},
  orders: [],
  deleteUserOrder: () => {},
  isAuthenticated: false,
};
export default MyOrders;
