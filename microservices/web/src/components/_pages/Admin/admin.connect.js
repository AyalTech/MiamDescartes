import { connect } from 'react-redux';
import Admin from './admin';
import { loadOrdersDay, loadOrdersToday, deleteUserOrderToday } from '../../../actions/orders';


const mapStateToProps = ({ orders, auth }) => ({
  isAdmin: auth.isAdmin,
  orders: orders.ordersDate,
});

export default connect(
  mapStateToProps,
  { loadOrdersDay, loadOrdersToday, deleteUserOrderToday },
)(Admin);
