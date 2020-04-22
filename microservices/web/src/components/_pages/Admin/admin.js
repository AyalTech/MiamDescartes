import React from 'react';
import Proptypes from 'prop-types';
import moment from 'moment';
import { Redirect, Link } from 'react-router-dom';
import './admin.less';
import {
  Button, Card, Col, Icon, message, Popconfirm, Result, Row, DatePicker,
} from 'antd';
import { strUcFirst, formatMonth } from '../../../helpers/string';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
    };
  }

  componentDidMount() {
    const { loadOrdersDay } = this.props;
    const { day, month } = this.state;
    loadOrdersDay(month, day);
  }

  handleDelete = async (id) => {
    const { deleteUserOrderToday, loadOrdersToday } = this.props;
    message.success('Le produit a bien été supprimé de la commande ! ');
    await deleteUserOrderToday(id);
    await loadOrdersToday();
  }

  handleDate = (date, dateString) => {
    const dateStringSplit = dateString.split('/');
    const month = dateStringSplit[1];
    const day = dateStringSplit[2];
    this.setState({
      month,
      day,
    });
  }

  handleChangeDate = () => {
    const { loadOrdersDay } = this.props;
    const { month, day } = this.state;
    loadOrdersDay(month, day);
  }

  cancel = () => {
    message.error('Le produit n\'a pas été supprimé de la commande');
  }

  sum = (orders, price) => {
    let result = 0;
    orders.forEach((order) => {
      result += parseFloat(order.Product[price]);
    });
    return result;
  }

  render() {
    const { orders, isAdmin } = this.props;
    const { month, day } = this.state;
    const today = new Date();
    const monthToday = today.getMonth() + 1;
    const dayToday = today.getDate();
    const dateFormat = 'YYYY/MM/DD';
    return (
      <>
        {
          // eslint-disable-next-line no-nested-ternary
        isAdmin ? (
          orders.orders ? (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
              <div className="date">
                <DatePicker
                  onChange={this.handleDate}
                  defaultValue={moment(`2019/${month}/${day}`, dateFormat)}
                  format={dateFormat}
                  allowClear={false}
                />
                <Button className="btn-date" onClick={this.handleChangeDate}>Changer</Button>
              </div>
              <div>
                <h1 className="title">{`Les commandes du ${day} / ${formatMonth(month)}`}</h1>
                <Row gutter={16}>
                  {
                  orders.orders.map((order) => (
                    <Col className="col" xs={32} sm={12} lg={8} key={order.id}>
                      <Card title={strUcFirst(order.Product.title)} bordered={false}>
                        <span className="card-price">{`${order.User.lastName} ${order.User.firstName}`}</span>
                        <br />
                        <span className="card-price">{`Prix: ${order.Product.price} €`}</span>
                        <br />
                        <span className="card-price">{`Prix Habad: ${order.Product.price_habad} €`}</span>
                        <Popconfirm
                          title={`${order.User.lastName} ${order.User.firstName} être vous sûr de vouloir supprimer cette commande ?`}
                          /* eslint-disable-next-line react/jsx-no-bind */
                          onConfirm={this.handleDelete.bind(this, order.id)}
                          onCancel={this.cancel}
                          okText="Oui"
                          cancelText="Non"
                        >
                          {
                            (month === monthToday) && (day === dayToday) && (
                              <Button className="card-button"><Icon type="close" /></Button>
                            )
                          }
                        </Popconfirm>
                      </Card>
                    </Col>
                  ))
                }
                </Row>
                <Card title="Compte" className="col compte">
                  <div className="content-compte">
                    <span>{`Argent pour habad ${this.sum(orders.orders, 'price_habad')} €`}</span>
                    <br />
                    <span>{`Argent totale ${this.sum(orders.orders, 'price')} €`}</span>
                    <br />
                    <span>{`Benef ${this.sum(orders.orders, 'price') - this.sum(orders.orders, 'price_habad')} €`}</span>
                  </div>
                </Card>
              </div>
            </div>
          )
            : (
              <>
                <Result
                  status="warning"
                  title="Il n'y a aucune commande aujourd'hui !"
                  extra={(
                    <Button color="primary">
                      <Link to="/order">Commander !</Link>
                    </Button>
                  )}
                />
              </>
            )
        ) : (
          <Redirect to="/error404" />
        )
      }
      </>
    );
  }
}

Admin.propTypes = {
  loadOrdersToday: Proptypes.func,
  loadOrdersDay: Proptypes.func,
  deleteUserOrderToday: Proptypes.func,
  isAdmin: Proptypes.bool,
  orders: Proptypes.shape({
    orders: Proptypes.arrayOf(Proptypes.object),
  }),
};

Admin.defaultProps = {
  loadOrdersToday: () => {},
  loadOrdersDay: () => {},
  deleteUserOrderToday: () => {},
  isAdmin: Proptypes.bool,
  orders: {},
};

export default Admin;
