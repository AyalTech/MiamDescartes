import { connect } from 'react-redux';
import Order from './order';
import { fetchProducts } from '../../../actions/products';
import { addOrderUser } from '../../../actions/orders';
import { loadUser } from '../../../actions/auth';

const mapStateToProps = ({ products, auth }) => ({
  products: products.products.products,
  isAuthenticated: auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { fetchProducts, addOrderUser, loadUser },
)(Order);
