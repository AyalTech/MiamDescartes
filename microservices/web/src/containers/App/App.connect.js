import { connect } from 'react-redux';
import { loadUser, logout } from '../../actions/auth';
import App from './App';

const mapStateToProps = ({ auth }) => ({
  auth,
});

export default connect(
  mapStateToProps,
  {
    loadUser,
    logout,
  },
)(App);
