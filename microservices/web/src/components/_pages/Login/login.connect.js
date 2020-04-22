import { connect } from 'react-redux';
import { login } from '../../../actions/auth';
import Login from './login';

const mapStateToProps = ({ auth, error }) => ({
  auth,
  error,
});

export default connect(
  mapStateToProps,
  { login },
)(Login);
