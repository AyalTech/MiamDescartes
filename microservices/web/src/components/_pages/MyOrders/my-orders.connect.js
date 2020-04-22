import { connect } from 'react-redux';
import MyOrders from './my-orders';
import { loadUserOrders, deleteUserOrder } from '../../../actions/orders';

const mapStateToProps = ({ orders, auth }) => ({
  isAuthenticated: auth.isAuthenticated,
  orders: orders.orders.orders,
});

export default connect(
  mapStateToProps,
  { loadUserOrders, deleteUserOrder },
)(MyOrders);
