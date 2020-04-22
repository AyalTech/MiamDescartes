import { connect } from 'react-redux';
import Home from './home';
import { fetchProducts } from '../../../actions/products';

const mapStateToProps = ({ auth, products }) => ({
  auth,
  products: products.products.products,
});

export default connect(
  mapStateToProps,
  { fetchProducts },
)(Home);
